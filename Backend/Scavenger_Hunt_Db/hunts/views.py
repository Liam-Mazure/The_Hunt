from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.template import loader


# Create your views here.
class CreateHunt(APIView):
    serializer_class = HuntSerializer
    def post(self, request):
        if not request.session.exists(self.request.session.session_key):
            request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data.get('id')
            title = serializer.validated_data.get('title')
            total_steps = serializer.validated_data.get('total_steps')

            queryset = Hunt.objects.filter(title=title)
            if queryset.exists():
                return Response({"error" : "A Hunt with this title already exists"})
            else:
                hunt = Hunt(title=title, total_steps=total_steps)
        hunt.save()
        return Response({"message" : "Hunt Created Successfully", "id": hunt.id})

class CreateHuntStep(APIView):
    stepSerializer_class = HuntStepsSerializer
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.stepSerializer_class(data=request.data)
        if serializer.is_valid():
            print("serializer validated data: ", serializer.validated_data)
            data = serializer.validated_data
            hunt_id = data.get('hunt')
            try:
                hunt = Hunt.objects.get(id=hunt_id.id)
            except Hunt.DoesNotExist:
                return Response({"error": "Hunt not found"}, status=404)
            step = data.get('step')
            clue = data.get('clue')
            img = data.get('img')
            hint = data.get('hint')

            queryset = HuntStep.objects.filter(clue=clue)
            if queryset.exists():
                return Response({"error" : "A step with this clue already exists"})
            else:
                step = HuntStep(hunt=hunt, step=step, clue=clue, img=img, hint=hint)
                print(f"saving step: {step}")
                step.save()
                return Response({"message" : "Hunt Step Created Successfully"})
        return Response({"error" : "Invalid Data", "Details": serializer.errors})

class DeleteHuntStep(APIView):
    def delete(self, request, step_id):
        print(f"Trying to delete HuntStep with ID: {step_id}")
        hunt_id = request.data.get('hunt')
        try:
            hunt = Hunt.objects.get(id = hunt_id)
            step = HuntStep.objects.get(id=step_id, hunt=hunt)
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

# def list_all_hunts(request):
#     allhunts = Hunt.objects.prefetch_related('hunt_steps').all()
#     template = loader.get_template('./allHunts.html')
#     data = {
#         'allhunts' : allhunts,
#     }
#     return HttpResponse(template.render(data,request))

def list_all_hunts(request):
    allhunts = Hunt.objects.all()
    # print(f"AllHunts: {allhunts}")
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
    }
    return JsonResponse(serializer.data)


class GetHuntStep(APIView):
    def get(self, request, hunt_id):
        try:
            hunt = Hunt.objects.get(id=hunt_id)
            steps = HuntStep.objects.filter(hunt=hunt)
            serializer = HuntStepsSerializer(steps, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hunt.DoesNotExist():
            return Response({'error': 'Hunt Not Found'}, status = status.HTTP_404_NOT_FOUND)
