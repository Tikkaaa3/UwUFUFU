from django.urls import path
from .views import home, CharacterListView

urlpatterns = [
    path('', home, name='home'),
    path('characters/', CharacterListView.as_view(), name='characters'),
]
