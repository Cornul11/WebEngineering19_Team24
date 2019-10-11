from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'songs', views.SongViewSet)
router.register(r'artists', views.ArtistsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('artists/', views.ArtistsViewSet.as_view({'get': 'retrieve'}))
]