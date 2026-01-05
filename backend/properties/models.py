"""
Models for the properties app.
"""
import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone


class Property(models.Model):
    """Property model for managing accommodations."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="properties",
        verbose_name="Proprietário"
    )
    
    # Basic info
    name = models.CharField(max_length=200, verbose_name="Nome")
    description = models.TextField(blank=True, verbose_name="Descrição")
    
    # Address
    address = models.CharField(max_length=300, verbose_name="Endereço")
    city = models.CharField(max_length=100, verbose_name="Cidade")
    state = models.CharField(max_length=100, verbose_name="Estado")
    zip_code = models.CharField(max_length=20, verbose_name="CEP")
    country = models.CharField(max_length=100, default="Brasil", verbose_name="País")
    
    # Contact
    phone = models.CharField(max_length=20, blank=True, verbose_name="Telefone")
    email = models.EmailField(blank=True, verbose_name="Email")
    website = models.URLField(blank=True, verbose_name="Website")
    
    # Soft delete
    is_active = models.BooleanField(default=True, verbose_name="Ativo")
    deleted_at = models.DateTimeField(null=True, blank=True, verbose_name="Deletado em")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        verbose_name = "Propriedade"
        verbose_name_plural = "Propriedades"
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.name} - {self.city}/{self.state}"
    
    def soft_delete(self):
        """Soft delete the property and all its accommodations."""
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
        # Soft delete all accommodations
        self.accommodations.update(is_active=False, deleted_at=timezone.now())


class Accommodation(models.Model):
    """Accommodation model for individual units within a property."""
    
    ACCOMMODATION_TYPES = [
        ("room", "Quarto"),
        ("suite", "Suíte"),
        ("apartment", "Apartamento"),
        ("house", "Casa"),
        ("cabin", "Chalé"),
        ("other", "Outro"),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="accommodations",
        verbose_name="Propriedade"
    )
    
    # Basic info
    name = models.CharField(max_length=200, verbose_name="Nome")
    description = models.TextField(blank=True, verbose_name="Descrição")
    accommodation_type = models.CharField(
        max_length=20,
        choices=ACCOMMODATION_TYPES,
        default="room",
        verbose_name="Tipo"
    )
    
    # Capacity
    max_guests = models.PositiveIntegerField(default=2, verbose_name="Máximo de hóspedes")
    beds = models.PositiveIntegerField(default=1, verbose_name="Número de camas")
    bathrooms = models.PositiveIntegerField(default=1, verbose_name="Número de banheiros")
    
    # Pricing
    base_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Preço base (por noite)"
    )
    cleaning_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Taxa de limpeza"
    )
    
    # Soft delete
    is_active = models.BooleanField(default=True, verbose_name="Ativo")
    deleted_at = models.DateTimeField(null=True, blank=True, verbose_name="Deletado em")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        verbose_name = "Acomodação"
        verbose_name_plural = "Acomodações"
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.name} ({self.property.name})"
    
    def soft_delete(self):
        """Soft delete the accommodation."""
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
