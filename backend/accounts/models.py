"""
Models for the accounts app.
"""
import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    """Custom User model with UUID primary key and additional fields."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Telefone")
    cpf = models.CharField(max_length=14, blank=True, null=True, unique=True, verbose_name="CPF")
    
    # User types
    is_owner = models.BooleanField(default=True, verbose_name="É proprietário")
    is_staff_member = models.BooleanField(default=False, verbose_name="É membro da equipe")
    
    # Soft delete
    deleted_at = models.DateTimeField(null=True, blank=True, verbose_name="Deletado em")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.email})"
    
    def soft_delete(self):
        """Soft delete the user."""
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()


class Role(models.Model):
    """Role model for user access levels."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True, verbose_name="Nome")
    description = models.TextField(blank=True, verbose_name="Descrição")
    is_system_role = models.BooleanField(default=False, verbose_name="É role do sistema")
    
    users = models.ManyToManyField(User, related_name="roles", blank=True, verbose_name="Usuários")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        verbose_name = "Papel"
        verbose_name_plural = "Papéis"
        ordering = ["name"]
    
    def __str__(self):
        return self.name


class Permission(models.Model):
    """Permission model for granular access control."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, verbose_name="Nome")
    codename = models.CharField(max_length=100, unique=True, verbose_name="Código")
    description = models.TextField(blank=True, verbose_name="Descrição")
    
    roles = models.ManyToManyField(Role, related_name="permissions", blank=True, verbose_name="Papéis")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        verbose_name = "Permissão"
        verbose_name_plural = "Permissões"
        ordering = ["name"]
    
    def __str__(self):
        return f"{self.name} ({self.codename})"
