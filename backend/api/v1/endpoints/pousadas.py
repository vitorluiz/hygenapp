"""
API endpoints for properties (pousadas).
"""
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.properties.models import Property, RoomType, Room


# TODO: Create serializers and implement viewsets
# class PropertyViewSet(viewsets.ModelViewSet):
#     queryset = Property.objects.all()
#     serializer_class = PropertySerializer
#     permission_classes = [permissions.IsAuthenticated]
