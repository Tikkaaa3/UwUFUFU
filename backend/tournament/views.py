from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Character
from .serializers import CharacterSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to the Tournament App</h1>")


class CharacterListView(APIView):
    def get(self, request):
        # Query all characters from the database
        characters = Character.objects.all()

        if not characters.exists():
            # If the database is empty, provide default characters
            default_characters = [
                {"id": 1, "name": "Naruto", "img": "https://via.placeholder.com/200x300"},
                {"id": 2, "name": "Sasuke", "img": "https://via.placeholder.com/200x300"},
                {"id": 3, "name": "Sakura", "img": "https://via.placeholder.com/200x300"},
                {"id": 4, "name": "Kakashi", "img": "https://via.placeholder.com/200x300"},
            ]
            return Response(default_characters)

        # Serialize and return characters from the database
        serializer = CharacterSerializer(characters, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = CharacterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
