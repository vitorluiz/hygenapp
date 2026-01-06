from rest_framework import viewsets, generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Property, Accommodation
from .serializers import (
    PropertyListSerializer,
    PropertyDetailSerializer,
    PropertyCreateSerializer,
    PropertyPublicSerializer,
    AccommodationSerializer
)


class PropertyViewSet(viewsets.ModelViewSet):
    """
    ViewSet para CRUD de propriedades.
    
    Permite que proprietários gerenciem suas propriedades (pousadas, hotéis, casas de temporada).
    
    **Permissões:** Requer autenticação JWT.
    
    **Filtros:** Retorna apenas propriedades do usuário autenticado.
    
    **Operações:**
    - `list`: Listar todas as propriedades do usuário
    - `create`: Criar nova propriedade
    - `retrieve`: Detalhes de uma propriedade específica
    - `update`: Atualizar propriedade
    - `partial_update`: Atualizar parcialmente
    - `destroy`: Soft delete da propriedade
    """
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        elif self.action == 'create':
            return PropertyCreateSerializer
        return PropertyDetailSerializer
    
    def get_queryset(self):
        """Retorna apenas propriedades do usuário autenticado"""
        return Property.objects.filter(
            owner=self.request.user,
            is_active=True
        ).select_related('owner').prefetch_related('accommodations').order_by('-created_at')
    
    def perform_create(self, serializer):
        """Associa a propriedade ao usuário autenticado"""
        serializer.save(owner=self.request.user)
    
    def perform_destroy(self, instance):
        """Soft delete da propriedade"""
        instance.soft_delete()


class PropertyPublicView(generics.RetrieveAPIView):
    """
    Visualização pública de propriedade (sem autenticação).
    
    Endpoint público para exibir informações da propriedade na landing page.
    Não expõe dados sensíveis do proprietário.
    
    **Permissões:** Nenhuma (público)
    
    **Lookup:** Por slug (SEO-friendly)
    
    **Exemplo:** `/api/v1/public/properties/pousada-vista-linda/`
    """
    serializer_class = PropertyPublicSerializer
    permission_classes = []  # No authentication required
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Return only active properties"""
        return Property.objects.filter(is_active=True).select_related('owner')


class AccommodationViewSet(viewsets.ModelViewSet):
    """
    ViewSet para CRUD de acomodações.
    
    Permite que proprietários gerenciem as acomodações (quartos, suítes, chalés)
    dentro de suas propriedades.
    
    **Permissões:** Requer autenticação JWT.
    
    **Filtros:** Retorna apenas acomodações de propriedades do usuário.
    
    **Operações:**
    - `list`: Listar todas as acomodações do usuário
    - `create`: Criar nova acomodação
    - `retrieve`: Detalhes de uma acomodação
    - `update`: Atualizar acomodação
    - `partial_update`: Atualizar parcialmente
    - `destroy`: Soft delete da acomodação
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AccommodationSerializer
    
    def get_queryset(self):
        """Retorna apenas acomodações das propriedades do usuário"""
        return Accommodation.objects.filter(
            property__owner=self.request.user,
            is_active=True
        ).select_related('property').order_by('-created_at')
    
    def perform_destroy(self, instance):
        """Soft delete da acomodação"""
        instance.is_active = False
        instance.deleted_at = timezone.now()
        instance.save()
