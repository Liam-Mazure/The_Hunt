from django.urls import path
from .  import views
from hunts.views import CreateHunt

urlpatterns = [
    path("create/", CreateHunt.as_view(), name = "create"),
    path("edit/", views.edit, name = "edit"),
    path("play/", views.play, name = "play"),
    path("list/", views.list_all_hunts, name = "list"),
    
]