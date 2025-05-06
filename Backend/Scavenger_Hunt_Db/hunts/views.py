from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.template import loader


# Create your views here.
class CreateHunt(APIView):
    serializer_class = HuntSerializer
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            total_steps = serializer.data.get('total_steps')

            queryset = Hunt.objects.filter(title=title)
            if queryset.exists():
                return Response({"error" : "A Hunt with this title already exists"})
            else:
                hunt = Hunt(title=title, total_steps=total_steps)
        hunt.save()
        return Response({"message" : "Hunt Created Successfully"})

class CreateHuntStep(APIView):
    def post(self, request):
        pass

def edit(request):
    return HttpResponse("Edit Hunt")

def play(request):
    return HttpResponse("Play Hunt")

def list_all_hunts(request):
    allhunts = Hunt.objects.all().values()
    template = loader.get_template('./allHunts.html')
    data = {
        'allhunts' : allhunts,
    }
    return HttpResponse(template.render(data,request))
