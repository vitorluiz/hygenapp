"""
Admin configuration for properties app.
"""
from django.contrib import admin
from .models import Property, Accommodation
from .models import Property, Accommodation, Image, PropertyAccess


class AccommodationInline(admin.TabularInline):
    """Inline admin for Accommodations within Property."""
    model = Accommodation
    extra = 1
    fields = ["name", "accommodation_type", "max_guests", "beds", "bathrooms", "base_price", "is_active"]


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    """Admin for Property model."""
    
    list_display = ['name', 'city', 'state', 'owner', 'is_active', 'created_at']
    list_filter = ['is_active', 'state', 'created_at']
    search_fields = ['name', 'city', 'owner__email']
    ordering = ["-created_at"]
    inlines = [AccommodationInline]
    
    fieldsets = (
        ("Informações Básicas", {"fields": ("owner", "name", "description")}),
        ("Endereço", {"fields": ("address", "city", "state", "zip_code", "country")}),
        ("Contato", {"fields": ("phone", "email", "website")}),
        ("Status", {"fields": ("is_active", "deleted_at")}),
    )
    
    readonly_fields = ["deleted_at"]


@admin.register(Accommodation)
class AccommodationAdmin(admin.ModelAdmin):
    """Admin for Accommodation model."""
    
    list_display = ["name", "property", "accommodation_type", "max_guests", "base_price", "is_active", "created_at"]
    list_filter = ["is_active", "accommodation_type", "created_at"]
    search_fields = ["name", "property__name", "description"]
    ordering = ["-created_at"]
    
    fieldsets = (
        ("Informações Básicas", {"fields": ("property", "name", "description", "accommodation_type")}),
        ("Capacidade", {"fields": ("max_guests", "beds", "bathrooms")}),
        ("Preços", {"fields": ("base_price", "cleaning_fee")}),
        ("Status", {"fields": ("is_active", "deleted_at")}),
    )
    
    readonly_fields = ["deleted_at"]
