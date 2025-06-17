from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.template import loader 
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


def main(request):
    return HttpResponse("Users Main")

def SignIn(request):
    template = loader.get_template('./authenticate/login.html')
    return HttpResponse(template.render())

class CreateUser(APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data.get('first_name')
            last_name = serializer.validated_data.get('last_name')
            email = serializer.validated_data.get('email')
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            
            queryset = User.objects.filter(email=email)
            if queryset.exists():
                return Response({"error": "A user with this email already exists."}, status = status.HTTP_400_BAD_REQUEST)
            else:
                user = User(first_name = first_name, last_name = last_name, email = email, username = username, is_active = True)
                user.set_password(password)
        
        user.save()
        return Response({"message": "User created Successfully"}, status=status.HTTP_201_CREATED)
    
def allUsers(request):
    myusers = User.objects.all().values()
    template = loader.get_template('./authenticate/allUsers.html')
    data = {
        'myusers' : myusers,
    }
    return HttpResponse(template.render(data, request))

def userInfo(request, id):
    myuser = User.objects.get(id=id)
    template = loader.get_template("./authenticate/userInfo.html")
    serializer = UserSerializer(myuser)
    data = {
        'first_name': myuser.first_name,
        'last_name': myuser.last_name,
        'email': myuser.email,
        'username': myuser.username,
    }
    return JsonResponse(serializer.data)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id

        return data
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer