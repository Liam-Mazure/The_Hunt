from rest_framework import serializers
from .models import *

class HuntStepsSerializer(serializers.ModelSerializer):
    img_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = HuntStep
        fields = ['id', 'hunt', 'step', 'clue', 'img', 'hint', 'img_url']

    def get_img_url(self,obj):
        request = self.context.get("request")
        if obj.img and hasattr(obj.img, "url"):
            return request.build_absolute_uri(obj.img.url) if request else obj.img.url
        return None

class HuntSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source = 'author.username', read_only = True)
    total_steps = serializers.SerializerMethodField()
    class Meta:
        model = Hunt
        fields = '__all__'
        extra_kwargs = {"author":{"read_only":True}}

    def get_total_steps(self, obj):
        return obj.total_steps