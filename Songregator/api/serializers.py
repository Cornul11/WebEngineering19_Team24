from rest_framework import serializers

from .models import Song


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    """
    Extracts information about artists.
    """
    class Meta:
        model = Song
        fields = ('artist_familiarity',
                  'artist_hotttnesss',
                  'artist_id',
                  'artist_latitude',
                  'artist_location',
                  'artist_longitude',
                  'artist_name',
                  'artist_similar',
                  'artist_terms',
                  'artist_terms_freq')


class SongSerializer(serializers.HyperlinkedModelSerializer):
    """
    Extracts information about songs.
    TODO: created for testing purposes. Intended for experiments only.
    """
    class Meta:
        model = Song
        fields = ('artist_longitude', 'artist_latitude')
