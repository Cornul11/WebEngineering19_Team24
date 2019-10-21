from django import forms

from .models import Song, Artist


class SongForm(forms.ModelForm):
    class Meta:
        model = Song
        fields = "__all__"


class ArtistForm(forms.ModelForm):
    class Meta:
        model = Artist
        fields = "__all__"
