from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import home, CharacterListView

urlpatterns = [
    path('', home, name='home'),
    path('characters/', CharacterListView.as_view(), name='characters'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
