from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'song', views.SongViewSet, base_name='song')
router.register(r'artists', views.ArtistViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('artists/', views.ArtistViewSet.as_view({'get': 'retrieve'})),
    path('song/<str:song_id>', views.SongViewSet.as_view({'get': 'retrieve'})),
]
