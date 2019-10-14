from rest_framework import viewsets

from .serializers import SongSerializer, ArtistSerializer
from .models import Song


# Create your views here.

class ArtistViewSet(viewsets.ModelViewSet):
    """
    Generates a view for retrieving information about artists.
    """
    queryset = Song.objects.all()
    serializer_class = ArtistSerializer

    def get_queryset(self):
        queryset = self.queryset

        # If name parameter is specified
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(artist_name=name)

        # If genre paratemer is specified
        genre = self.request.query_params.get('genre')
        if genre:
            queryset = queryset.filter(artist_terms=genre)

        # If ordered paratemer is specified
        ordered = self.request.query_params.get('ordered')
        if ordered in ['1', 'true']:
            queryset = queryset.order_by('-artist_hotttnesss')

            # If subset parameter is specified; applicable only if ordered is present.
            subset = self.request.query_params.get('subset')
            if subset and subset.isdigit():
                queryset = queryset[:int(subset)]

        return queryset


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by('artist_longitude')
    serializer_class = SongSerializer
