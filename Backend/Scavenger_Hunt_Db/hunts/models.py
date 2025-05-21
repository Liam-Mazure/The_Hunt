from django.db import models


class Hunt(models.Model):
    title = models.CharField(max_length = 100)
    total_steps = models.IntegerField()

class HuntStep(models.Model):
    hunt = models.ForeignKey(Hunt, related_name='hunt_steps', on_delete=models.CASCADE)
    step = models.IntegerField()
    clue = models.TextField(max_length=500)
    img = models.ImageField(upload_to='huntsteps/')
    hint = models.TextField(max_length = 300)