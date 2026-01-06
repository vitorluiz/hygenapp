from rest_framework import viewsets, generics, permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django.utils import timezone
from .models import Property, Accommodation, Image
from .serializers import (
    PropertyListSerializer,
    PropertyDetailSerializer,
    PropertyCreateSerializer,
    PropertyPublicSerializer,
    AccommodationListSerializer,
    AccommodationDetailSerializer,
    AccommodationCreateSerializer,
    ImageSerializer
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
        ).select_related('owner').prefetch_related('accommodations', 'images').order_by('-created_at')
    
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
        return Property.objects.filter(is_active=True).select_related('owner').prefetch_related('images')


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
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AccommodationListSerializer
        elif self.action == 'create':
            return AccommodationCreateSerializer
        return AccommodationDetailSerializer
    
    def get_queryset(self):
        """Retorna apenas acomodações das propriedades do usuário"""
        return Accommodation.objects.filter(
            property__owner=self.request.user,
            is_active=True
        ).select_related('property').prefetch_related('images').order_by('-created_at')
    
    def perform_destroy(self, instance):
        """Soft delete da acomodação"""
        instance.is_active = False
        instance.deleted_at = timezone.now()
        instance.save()
    
    @action(detail=False, methods=['get'])
    def by_property(self, request):
        """Listar acomodações de uma propriedade específica"""
        property_id = request.query_params.get('property_id')
        if not property_id:
            return Response(
                {"error": "property_id é obrigatório"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        accommodations = self.get_queryset().filter(property_id=property_id)
        serializer = self.get_serializer(accommodations, many=True)
        return Response(serializer.data)


class ImageViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar imagens.
    
    Permite upload e gerenciamento de imagens de propriedades e acomodações.
    
    **Permissões:** Requer autenticação JWT.
    
    **Filtros:** Retorna apenas imagens de propriedades/acomodações do usuário.
    
    **Operações:**
    - `list`: Listar todas as imagens
    - `create`: Upload de nova imagem
    - `retrieve`: Detalhes de uma imagem
    - `update`: Atualizar imagem (caption, order)
    - `destroy`: Deletar imagem
    - `reorder`: Reordenar múltiplas imagens
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer
    
    def get_queryset(self):
        """Filtrar apenas imagens de propriedades/acomodações do usuário"""
        return Image.objects.filter(
            models.Q(property__owner=self.request.user) |
            models.Q(accommodation__property__owner=self.request.user)
        ).select_related('property', 'accommodation').order_by('order', '-created_at')
    
    @action(detail=False, methods=['post'])
    def reorder(self, request):
        """
        Reordenar imagens.
        
        **Body:** `{"image_ids": ["uuid1", "uuid2", "uuid3"]}`
        """
        image_ids = request.data.get('image_ids', [])
        if not image_ids:
            return Response(
                {"error": "image_ids é obrigatório"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        for index, image_id in enumerate(image_ids):
            Image.objects.filter(id=image_id).update(order=index)
        
        return Response({"status": "success", "message": f"{len(image_ids)} imagens reordenadas"})
