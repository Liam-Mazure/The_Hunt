from django.db import models
from users.models import User


class Hunt(models.Model):
    title = models.CharField(max_length = 100)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "hunt", default=None, null=True)
    liked_by = models.ManyToManyField(User, related_name='linked_hunts', blank=True)

    @property
    def total_steps(self):
        return self.hunt_steps.count()
    
    @property
    def total_likes(self):
        return self.liked_by.count()
    
class HuntStep(models.Model):
    hunt = models.ForeignKey(Hunt, related_name='hunt_steps', on_delete=models.CASCADE)
    step = models.IntegerField()
    clue = models.TextField(max_length=500)
    img = models.ImageField(upload_to='huntsteps/')
    hint = models.TextField(max_length = 300)

class HuntScore(models.Model):
    score = models.IntegerField(default=0)
    top_score = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hunt = models.ForeignKey(Hunt, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True, null=True)