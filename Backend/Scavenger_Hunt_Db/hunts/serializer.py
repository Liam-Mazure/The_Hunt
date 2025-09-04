from rest_framework import serializers
from .models import *

class HuntStepsSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = HuntStep
        fields = '__all__'
        
    def get_img(self,obj):
        return obj.img.url if obj.img else None

class HuntSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source = 'author.username', read_only = True)
    total_steps = serializers.SerializerMethodField()
    class Meta:
        model = Hunt
        fields = '__all__'
        extra_kwargs = {"author":{"read_only":True}}

    def get_total_steps(self, obj):
        return obj.total_steps