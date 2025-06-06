from django.urls import path
from . import views
from users.views import CreateUser

urlpatterns = [
    path("signIn/", views.SignIn, name = "login"),
    path("signUp/", CreateUser.as_view(), name = "create"),
    path("all/", views.allUsers, name = "all"),
    path("all/info/id:<int:id>", views.userInfo, name = "info"),
]