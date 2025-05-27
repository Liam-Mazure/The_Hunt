from django.urls import path
from .  import views
from hunts.views import CreateHunt,CreateHuntStep,DeleteHuntStep,GetHuntStep, UpdateHunt

urlpatterns = [
    path("create/", CreateHunt.as_view(), name = "createHunt"),
    path("createstep/", CreateHuntStep.as_view(), name = "createStep"),
    path("deletestep/<int:step_id>/", DeleteHuntStep.as_view(), name = "deleteStep"),
    path("update/<int:id>", UpdateHunt.as_view(), name = "update"),
    path("play/", views.play, name = "play"),
    path("list/", views.list_all_hunts, name = "list_all_hunts"),
    path("list/<int:hunt_id>", GetHuntStep.as_view(), name = "list_hunt_step"),
    
]