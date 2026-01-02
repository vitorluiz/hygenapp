from django.contrib import admin
from .models import Property, RoomType, Room


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['name', 'tenant', 'city', 'state', 'is_active']
    list_filter = ['is_active', 'state', 'tenant']
    search_fields = ['name', 'city']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'property', 'max_guests', 'base_price', 'quantity', 'is_active']
    list_filter = ['is_active', 'property']


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['number', 'room_type', 'floor', 'is_active']
    list_filter = ['is_active', 'room_type']
