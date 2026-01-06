from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PropertyViewSet, PropertyPublicView, AccommodationViewSet, ImageViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'accommodations', AccommodationViewSet, basename='accommodation')
router.register(r'images', ImageViewSet, basename='image')

urlpatterns = [
    path('', include(router.urls)),
    path('public/properties/<slug:slug>/', PropertyPublicView.as_view(), name='property-public'),
]
