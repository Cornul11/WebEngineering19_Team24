from rest_framework import viewsets

from .serializers import SongSerializer, ArtistSerializer
from .models import Song


# Create your views here.

class ArtistsViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = ArtistSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            return queryset.filter(artist_name=name)
        return queryset


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by('artist_longitude')
    serializer_class = SongSerializer
