from statistics import mean, median, stdev

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Song, Artist
from .serializers import SongSerializer, ArtistSerializer


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

        # If genre parameter is specified
        genre = self.request.query_params.get('genre')
        if genre:
            queryset = queryset.filter(artist_terms=genre)

        # If ordered parameter is specified
        ordered = self.request.query_params.get('ordered')
        if ordered in ['1', 'true']:
            queryset = queryset.order_by('-artist_hotttnesss')

            # If subset parameter is specified; applicable only if ordered is present.
            subset = self.request.query_params.get('subset')
            if subset and subset.isdigit():
                queryset = queryset[:int(subset)]

        return queryset


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_field = 'song_id'

    def get_queryset(self):
        queryset = self.queryset
        song_id = self.kwargs['song_id']
        return queryset.filter(song_id=song_id)


class SongListViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def get_queryset(self):
        queryset = self.queryset

        artist = self.request.query_params.get('artist')
        if artist:
            queryset = queryset.filter(artist_name=artist)

        year = self.request.query_params.get('year')
        if year and year.isdigit():
            queryset = queryset.filter(song_year=int(year))

        ordered = self.request.query_params.get('ordered')
        if ordered in ['1', 'true']:
            queryset = queryset.order_by('-song_hotttnesss')

            subset = self.request.query_params.get('subset')
            if subset and subset.isdigit():
                queryset = queryset[:int(subset)]

        return queryset


class StatisticsViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        statistics = dict()

        data = list(queryset.values_list('song_hotttnesss', flat=True))
        if not data:
            # If queryset is empty, we return an empty dictionary
            return Response(statistics)
        statistics['mean'] = mean(data)
        statistics['median'] = median(data) if len(data) > 1 else data[0]
        statistics['std'] = stdev(data) if len(data) > 1 else data[0]

        return Response(statistics)

    def get_queryset(self):
        queryset = self.queryset

        artist = self.request.query_params.get('artist')
        if not artist:
            # Artist is MANDATORY
            artist = ''
        queryset = queryset.filter(artist_name=artist)
        if not artist:
            # If artist is not provided, return an empty queryset
            return queryset

        year = self.request.query_params.get('year')
        if year and year.isdigit():
            queryset = queryset.filter(song_year=int(year))

        return queryset


class DeleteSongsViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    lookup_field = 'artist_name'

    def destroy(self, request, *args, **kwargs):
        artist_list = list(self.get_queryset().values_list('artist_name', flat=True))
        if not artist_list:
            return Response()
        artist_name = artist_list[0]
        queryset = Song.objects.filter(artist_name=artist_name)
        deleted_songs = SongSerializer(queryset, many=True).data
        for song in queryset:
            self.perform_destroy(song)
        return Response(deleted_songs)

    def get_queryset(self):
        queryset = self.queryset
        artist_name = self.kwargs['artist_name']
        return queryset.filter(artist_name=artist_name)
