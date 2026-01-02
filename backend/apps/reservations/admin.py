from django.contrib import admin
from .models import Guest, Reservation


@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'property', 'created_at']
    search_fields = ['name', 'email', 'cpf']
    list_filter = ['property']


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['id', 'guest', 'property', 'room_type', 'check_in', 'check_out', 'status', 'total_price']
    list_filter = ['status', 'source', 'property']
    search_fields = ['guest__name', 'external_id']
    date_hierarchy = 'check_in'
