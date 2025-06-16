from django.db import models
from users.models import User


class Hunt(models.Model):
    title = models.CharField(max_length = 100)
    total_steps = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "hunt", default=None, null=True)

class HuntStep(models.Model):
    hunt = models.ForeignKey(Hunt, related_name='hunt_steps', on_delete=models.CASCADE)
    step = models.IntegerField()
    clue = models.TextField(max_length=500)
    img = models.ImageField(upload_to='huntsteps/')
    hint = models.TextField(max_length = 300)