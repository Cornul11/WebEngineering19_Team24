from statistics import mean, median, stdev

from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from common.util.helpers import isfloat

from .models import Song, Artist
from .serializers import SongSerializer, ArtistSerializer


# Create your views here.

class ArtistViewSet(viewsets.ModelViewSet):
    """
    Generates a view for retrieving information about artists.
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    lookup_field = 'artist_name'
    renderer_classes = [JSONRenderer, CSVRenderer]

    def create(self, request, *args, **kwargs):
        """
        Create artist based on request parameters. All fields should be present in the request.
        :param request: CREATE request containing all parameters.
        :return: Response with information about created artist
        """
        params = self.parse_params(request)
        if not params['artist_name']:
            return Response({'ERROR': 'You should provide at least a name of an artist.'})

        if len(Artist.objects.filter(artist_name=params['artist_name'])) > 0:
            return Response({'ERROR': 'Artist with the same name already exists.'})

        artist = Artist.objects.create(
            artist_familiarity=params['artist_familiarity'],
            artist_hotttnesss=params['artist_hotttnesss'],
            artist_id=params['artist_id'],
            artist_latitude=params['artist_latitude'],
            artist_location=params['artist_location'],
            artist_longitude=params['artist_longitude'],
            artist_name=params['artist_name'],
            artist_similar=params['artist_similar'],
            artist_terms=params['artist_terms'],
            artist_terms_freq=params['artist_terms_freq']
        )

        return Response(ArtistSerializer(artist).data)

    def partial_update(self, request, *args, **kwargs):
        """
        Update longitude and latitude of selected artist.
        :param request: PATCH request that contains longitude and latitude
        :return: Response with name and new longitude and latitude of artist
        """
        longitude = request.query_params.get('longitude')
        latitude = request.query_params.get('latitude')
        if isfloat(longitude) and isfloat(latitude):
            artist_name = self.kwargs['artist_name']
            artist = Artist.objects.filter(artist_name=artist_name)

            artist.update(artist_longitude=longitude)
            artist.update(artist_latitude=latitude)

            updated_data = dict()
            updated_data['artist_name'] = artist_name
            updated_data['artist_longitude'] = longitude
            updated_data['artist_latitude'] = latitude
            return Response(updated_data)
        return Response({"detail": "Both new longitude and latitude should be passed."})

    def destroy(self, request, *args, **kwargs):
        """
        Delete artist by his/her name and all his/her songs.
        :param request: DELETE request with artist's name
        :return: List of deleted songs
        """
        artist_name = self.kwargs['artist_name']
        artist = Artist.objects.get(artist_name=artist_name)
        song_queryset = Song.objects.filter(artist_name=artist_name)
        deleted_songs = SongSerializer(song_queryset, many=True).data
        for song in song_queryset:
            self.perform_destroy(song)
        self.perform_destroy(artist)
        return Response(deleted_songs)

    def get_queryset(self):
        queryset = Artist.objects.all()

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

    def parse_params(self, request):
        """
        Validate and parse all parameters for creating a new Artist.
        :param request: CREATE request containing required query parameters.
        :return: Dictionary with parsed parameters
        """
        params = dict()

        self.validate_param(request, params, 'artist_familiarity', 'float')
        self.validate_param(request, params, 'artist_hotttnesss', 'float')
        self.validate_param(request, params, 'artist_id', 'str')
        self.validate_param(request, params, 'artist_latitude', 'float')
        self.validate_param(request, params, 'artist_location', 'int')
        self.validate_param(request, params, 'artist_longitude', 'float')
        self.validate_param(request, params, 'artist_name', 'str')
        self.validate_param(request, params, 'artist_similar', 'float')
        self.validate_param(request, params, 'artist_terms', 'str')
        self.validate_param(request, params, 'artist_terms_freq', 'float')

        return params

    @staticmethod
    def validate_param(request, params, param_name, param_type):
        """
        Validate parameters.
        If success, then assign a parameter to a corresponding key.
        If failure, then assign default value to a key (0 for int, 0.0 for float, "" for str).
        :param request:
        :param params:
        :param param_name:
        :param param_type:
        :return:
        """
        param = request.query_params.get(param_name[7:])  # skip "artist_"
        try:
            if param_type == 'str':
                params[param_name] = "" if not param else param
            elif param_type == 'float':
                params[param_name] = float(param)
            else:
                params[param_name] = int(param)
        except (ValueError, TypeError):
            if param_type == 'str':
                params[param_name] = ""
            elif param_type == 'float':
                params[param_name] = 0.0
            else:
                params[param_name] = 0


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_field = 'song_id'
    renderer_classes = [JSONRenderer, CSVRenderer]

    def get_queryset(self):
        queryset = Song.objects.all()

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
    renderer_classes = [JSONRenderer, CSVRenderer]

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
        queryset = Song.objects.all()

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
