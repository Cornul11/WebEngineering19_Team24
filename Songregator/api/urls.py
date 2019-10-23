from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'songs', views.SongViewSet, base_name='song')
router.register(r'artists', views.ArtistViewSet, base_name='artists')
router.register(r'popularity', views.StatisticsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
