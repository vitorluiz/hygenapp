from django.db import models
from apps.accounts.models import Tenant


class Property(models.Model):
    """Property (Pousada) model."""
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='properties')
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    cover_image = models.ImageField(upload_to='properties/covers/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Novos campos PlanoAcaoV4
    documento = models.CharField(max_length=20, blank=True, help_text='CPF ou CNPJ')
    razao_social = models.CharField(max_length=255, blank=True)
    telefone_contato = models.CharField(max_length=20, blank=True, help_text='Telefone/WhatsApp principal')
    email_contato = models.EmailField(blank=True, help_text='E-mail principal de contato')
    link_google_maps = models.URLField(blank=True, help_text='Link do Google Maps')
    link_rede_social = models.URLField(blank=True, help_text='Link do Instagram, Facebook, etc.')
    horario_funcionamento = models.CharField(max_length=100, blank=True, help_text='Ex: 08:00 - 22:00')
    dominio_personalizado = models.CharField(
        max_length=255, 
        unique=True, 
        null=True, 
        blank=True, 
        help_text='Domínio próprio da pousada (ex: pousadavistadaserra.com.br)'
    )
    
    class Meta:
        verbose_name = 'Propriedade'
        verbose_name_plural = 'Propriedades'
        unique_together = ['tenant', 'slug']
    
    def __str__(self):
        return self.name


class RoomType(models.Model):
    """Room type model."""
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='room_types')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    max_guests = models.PositiveIntegerField(default=2)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    amenities = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Tipo de Quarto'
        verbose_name_plural = 'Tipos de Quartos'
    
    def __str__(self):
        return f"{self.name} - {self.property.name}"


class Room(models.Model):
    """Individual room model."""
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='rooms')
    number = models.CharField(max_length=20)
    floor = models.CharField(max_length=20, blank=True)
    notes = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Quarto'
        verbose_name_plural = 'Quartos'
        unique_together = ['room_type', 'number']
    
    def __str__(self):
        return f"Quarto {self.number} - {self.room_type.name}"
