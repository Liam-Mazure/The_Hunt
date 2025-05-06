from rest_framework import serializers
from .models import *

class HuntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hunt
        fields = '__all__'

class HuntStepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HuntStep
        fields = '__all__'