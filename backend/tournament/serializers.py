from rest_framework import serializers
from .models import Character


class CharacterSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Character
        fields = ['id', 'name', 'img']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            return request.build_absolute_uri(obj.img.url)
        return None
