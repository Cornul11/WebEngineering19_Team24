from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'song', views.SongViewSet, base_name='song')
router.register(r'artists', views.ArtistViewSet, base_name='artists')
router.register(r'artists/delete', views.DeleteArtistViewSet)
router.register(r'popularity', views.StatisticsViewSet)
router.register(r'songs', views.SongListViewSet)
router.register(r'songs/delete', views.DeleteSongsViewSet, base_name='delete')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
