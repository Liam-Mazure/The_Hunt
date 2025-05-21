from rest_framework import serializers
from .models import *

class HuntStepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HuntStep
        fields = '__all__'

class HuntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hunt
        fields = '__all__'