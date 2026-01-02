from django.db import models
from apps.accounts.models import User
from apps.properties.models import Property, Room, RoomType


class Guest(models.Model):
    """Guest model."""
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='guests')
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    cpf = models.CharField(max_length=14, blank=True)
    document_type = models.CharField(max_length=20, default='CPF')
    document_number = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Hóspede'
        verbose_name_plural = 'Hóspedes'
    
    def __str__(self):
        return self.name


class Reservation(models.Model):
    """Reservation model."""
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('confirmed', 'Confirmada'),
        ('checked_in', 'Check-in Realizado'),
        ('checked_out', 'Check-out Realizado'),
        ('cancelled', 'Cancelada'),
        ('no_show', 'No Show'),
    ]
    
    SOURCE_CHOICES = [
        ('direct', 'Direto'),
        ('booking', 'Booking.com'),
        ('airbnb', 'Airbnb'),
        ('expedia', 'Expedia'),
        ('other', 'Outro'),
    ]
    
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reservations')
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='reservations')
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True, related_name='reservations')
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='reservations')
    
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.PositiveIntegerField(default=1)
    children = models.PositiveIntegerField(default=0)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='direct')
    external_id = models.CharField(max_length=100, blank=True)
    
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    special_requests = models.TextField(blank=True)
    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_reservations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Reserva #{self.id} - {self.guest.name}"
