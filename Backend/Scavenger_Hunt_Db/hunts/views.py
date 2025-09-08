from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.template import loader


# Create your views here.
class CreateHunt(APIView):
    serializer_class = HuntSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if not request.session.exists(self.request.session.session_key):
            request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data.get('id')
            title = serializer.validated_data.get('title')

            # Fetch the User instance using the username provided
            author_username = request.user.username  # Since the user is already authenticated
            author = User.objects.get(username=author_username)  # This fetches the User instance

            queryset = Hunt.objects.filter(title=title)
            if queryset.exists():
                return Response({"error" : "A Hunt with this title already exists"})
            else:
                hunt = Hunt(title=title, author=author)
        hunt.save()
        return Response({"message" : "Hunt Created Successfully", "id": hunt.id})

class CreateHuntStep(APIView):
    stepSerializer_class = HuntStepsSerializer
    permissions_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("Authenticated User: ", request.user)
        print("Request Data: ", request.data)
        print("Requested FILES: ", request.FILES)

        serializer = self.stepSerializer_class(data=request.data)
        if serializer.is_valid():
            step = serializer.save()
            return Response({
                "message": "Hunt Step Created Successfully",
                "step": HuntStepsSerializer(step, context={"request":request}).data
            })
            # print("serializer validated data: ", serializer.validated_data)
            # data = serializer.validated_data
            # hunt = data.get('hunt')

            # step = data.get('step')
            # clue = data.get('clue')
            # img = data.get('img')
            # hint = data.get('hint')

            # queryset = HuntStep.objects.filter(clue=clue)
            # if queryset.exists():
            #     return Response({"error" : "A step with this clue already exists"})
            # else:
            #     step = HuntStep(hunt=hunt, step=step, clue=clue, img=img, hint=hint)
            #     print(f"saving step: {step}")
            #     step.save()
            #     return Response({"message" : "Hunt Step Created Successfully"})
        return Response({"error" : "Invalid Data", "Details": serializer.errors}, status=400)

class DeleteHuntStep(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, step_id):
        print(f"Trying to delete HuntStep with ID: {step_id}")

        try:
            
            step = HuntStep.objects.get(id=step_id)
            step.delete()
            return Response({'message':'Step Deleted'},status = status.HTTP_204_NO_CONTENT)
        except HuntStep.DoesNotExist:
            return Response({'error': 'Step Not Found'}, status = status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return Response({'error': 'Server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateHunt(APIView):
    def patch(self,request,*args, **kwargs ):
        hunt_id = kwargs.get('id')
        
        try:
            hunt = Hunt.objects.get(id = hunt_id)
        except Hunt.DoesNotExist:
            return Response(status = 404)
        
        serializer = HuntSerializer(hunt, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = 400)
        
class UpdateHuntStep(APIView):
    def patch(self,request, hunt_id, step_id):
        print("Request Data: ", request.data)
        try:
            hunt = Hunt.objects.get(id=hunt_id)
            step = HuntStep.objects.get(id=step_id)

            print("Hunt Id: ", hunt_id)
            print("Step: ", step)

        
            serializer = HuntStepsSerializer(step, data = request.data, partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            print("serializer Error: ", serializer.errors)
            return Response(serializer.errors, status = 400)
        
        except Hunt.DoesNotExist:
            return Response({'error': 'Hunt not found.'}, status=404)
        except HuntStep.DoesNotExist:
            return Response({'error': 'Step not found for this hunt.'}, status=404)

def play(request):
    return HttpResponse("Play Hunt")


def list_all_hunts(request):
    allhunts = Hunt.objects.all()
    #print(f"AllHunts: {allhunts}")
    serializer = HuntSerializer(allhunts, many=True)
    data = {
        'allhunts' : allhunts,
    }
    return JsonResponse(serializer.data, safe=False)

def list_hunt(request, id):
    hunt = Hunt.objects.get(id=id)
    serializer = HuntSerializer(hunt)
    template = loader.get_template('./allHunts.html')
    data = {
        'title': hunt.title,
        'total_steps':hunt.total_steps,
        'author': hunt.author,
    }
    return JsonResponse(serializer.data)


class GetHuntStep(APIView):
    def get(self, request, hunt_id):
        try:
            hunt = Hunt.objects.get(id=hunt_id)
            steps = HuntStep.objects.filter(hunt=hunt)
            serializer = HuntStepsSerializer(steps, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hunt.DoesNotExist:
            return Response({'error': 'Hunt Not Found'}, status=status.HTTP_404_NOT_FOUND)
        
class HuntScore(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, hunt_id):
        hunt = Hunt.objects.get(id=hunt_id)
        user = request.user

        score = request.data.get('score')

        result = HuntScore.objects.create(user=user, hunt=hunt, score=score)

        return Response({
            "message": "Hunt Finished!",
            "score": score
        })

class LikeHunt(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, hunt_id):
        hunt = Hunt.objects.get(id=hunt_id)
        user = request.user

        if user in hunt.liked_by.all():
            hunt.liked_by.remove(user)
            return Response({'message': 'Hunt unliked'})
        else:
            hunt.liked_by.add(user)
            return Response({'message': 'Hunt liked'})