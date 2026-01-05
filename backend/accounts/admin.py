"""
Admin configuration for accounts app.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, Permission


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin for custom User model."""
    
    list_display = ["username", "email", "first_name", "last_name", "is_owner", "is_staff", "is_active", "created_at"]
    list_filter = ["is_owner", "is_staff_member", "is_staff", "is_superuser", "is_active", "created_at"]
    search_fields = ["username", "email", "first_name", "last_name", "cpf", "phone"]
    ordering = ["-created_at"]
    
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Informações Pessoais", {"fields": ("first_name", "last_name", "email", "phone", "cpf")}),
        ("Tipo de Usuário", {"fields": ("is_owner", "is_staff_member")}),
        ("Permissões", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Datas Importantes", {"fields": ("last_login", "date_joined", "deleted_at")}),
    )
    
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password1", "password2", "is_owner"),
        }),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    """Admin for Role model."""
    
    list_display = ["name", "is_system_role", "created_at"]
    list_filter = ["is_system_role", "created_at"]
    search_fields = ["name", "description"]
    filter_horizontal = ["users"]
    ordering = ["name"]


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    """Admin for Permission model."""
    
    list_display = ["name", "codename", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["name", "codename", "description"]
    filter_horizontal = ["roles"]
    ordering = ["name"]
