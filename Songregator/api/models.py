from django.db import models


# Create your models here.

class Artist(models.Model):
    artist_familiarity = models.FloatField()
    artist_hotttnesss = models.FloatField()
    artist_id = models.CharField(max_length=80)
    artist_latitude = models.FloatField()
    artist_location = models.IntegerField()
    artist_longitude = models.FloatField()
    artist_name = models.CharField(max_length=270, unique=True)
    artist_similar = models.FloatField()
    artist_terms = models.CharField(max_length=80)
    artist_terms_freq = models.FloatField()

    def __str__(self):
        return str(self.artist_name)


class Song(models.Model):
    artist_familiarity = models.FloatField()
    artist_hotttnesss = models.FloatField()
    artist_id = models.CharField(max_length=80)
    artist_latitude = models.FloatField()
    artist_location = models.IntegerField()
    artist_longitude = models.FloatField()
    artist_name = models.CharField(max_length=270)
    artist_similar = models.FloatField()
    artist_terms = models.CharField(max_length=80)
    artist_terms_freq = models.FloatField()

    release_id = models.IntegerField()
    release_name = models.IntegerField()

    song_artist_mbtags = models.FloatField()
    song_artist_mbtags_count = models.FloatField()
    song_bars_confidence = models.FloatField()
    song_bars_start = models.FloatField()
    song_beats_confidence = models.FloatField()
    song_beats_start = models.FloatField()
    song_duration = models.FloatField()
    song_end_of_fade_in = models.FloatField()
    song_hotttnesss = models.FloatField()
    song_id = models.CharField(max_length=80, primary_key=True)
    song_key = models.FloatField()
    song_key_confidence = models.FloatField()
    song_loudness = models.FloatField()
    song_mode = models.IntegerField()
    song_mode_confidence = models.FloatField()
    song_start_of_fade_out = models.FloatField()
    song_tatums_confidence = models.FloatField()
    song_tatums_start = models.FloatField()
    song_tempo = models.FloatField()
    song_time_signature = models.FloatField()
    song_time_signature_confidence = models.FloatField()
    song_title = models.CharField(max_length=120)
    song_year = models.IntegerField()

    def __str__(self):
        return str(self.song_title)
