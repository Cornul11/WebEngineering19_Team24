from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'song', views.SongViewSet, base_name='song')
router.register(r'artists', views.ArtistViewSet, base_name='artists')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('songs', views.SongListViewSet.as_view({'get': 'list'})),
    path('popularity/', views.StatisticsViewSet.as_view({'get': 'list'}))
]
