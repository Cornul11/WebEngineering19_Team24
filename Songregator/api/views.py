from django.shortcuts import render
from rest_framework import viewsets

from .serializers import SongSerializer
from .models import Song


# Create your views here.

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by('artist_longitude')
    serializer_class = SongSerializer
