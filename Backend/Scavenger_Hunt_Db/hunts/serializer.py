from rest_framework import serializers
from .models import *

class HuntStepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HuntStep
        fields = '__all__'

class HuntSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source = 'author.username', read_only = True)
    total_steps = serializers.SerializerMethodField()
    class Meta:
        model = Hunt
        fields = '__all__'
        extra_kwargs = {"author":{"read_only":True}}

    def get_total_steps(self, obj):
        return obj.total_steps