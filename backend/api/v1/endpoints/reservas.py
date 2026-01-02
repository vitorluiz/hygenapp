"""
API endpoints for reservations.
"""
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.reservations.models import Reservation, Guest


# TODO: Create serializers and implement viewsets
# class ReservationViewSet(viewsets.ModelViewSet):
#     queryset = Reservation.objects.all()
#     serializer_class = ReservationSerializer
#     permission_classes = [permissions.IsAuthenticated]
