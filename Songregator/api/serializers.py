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
    class Meta:
        model = Song
        fields = ('song_artist_mbtags',
                  'song_artist_mbtags_count',
                  'song_bars_confidence',
                  'song_bars_start',
                  'song_beats_confidence',
                  'song_beats_start',
                  'song_duration',
                  'song_end_of_fade_in',
                  'song_hotttnesss',
                  'song_id',
                  'song_key',
                  'song_key_confidence',
                  'song_loudness',
                  'song_mode',
                  'song_mode_confidence',
                  'song_start_of_fade_out',
                  'song_tatums_confidence',
                  'song_tatums_start',
                  'song_tempo',
                  'song_time_signature',
                  'song_time_signature_confidence',
                  'song_title',
                  'song_year')
