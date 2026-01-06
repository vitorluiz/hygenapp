from rest_framework import serializers
from .models import Property, Accommodation, Image
from accounts.serializers import UserSerializer


class ImageSerializer(serializers.ModelSerializer):
    """Serializer para imagens"""
    
    class Meta:
        model = Image
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        # Garantir que property OU accommodation está preenchido
        if not data.get('property') and not data.get('accommodation'):
            raise serializers.ValidationError(
                "Imagem deve estar associada a uma propriedade ou acomodação"
            )
        if data.get('property') and data.get('accommodation'):
            raise serializers.ValidationError(
                "Imagem não pode estar associada a ambos"
            )
        return data


class PropertyListSerializer(serializers.ModelSerializer):
    """Serializer para listagem de propriedades"""
    accommodations_count = serializers.SerializerMethodField()
    images_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = ['id', 'name', 'slug', 'city', 'state', 'country', 'is_active', 
                  'created_at', 'accommodations_count', 'images_count', 'logo']
        read_only_fields = ['id', 'created_at']
    
    def get_accommodations_count(self, obj):
        return obj.accommodations.filter(is_active=True).count()
    
    def get_images_count(self, obj):
        return obj.images.count()


class PropertyDetailSerializer(serializers.ModelSerializer):
    """Serializer detalhado para propriedade"""
    owner = UserSerializer(read_only=True)
    accommodations_count = serializers.SerializerMethodField()
    images = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at', 'deleted_at']
    
    def get_accommodations_count(self, obj):
        return obj.accommodations.filter(is_active=True).count()


class PropertyCreateSerializer(serializers.ModelSerializer):
    """Serializer para criação de propriedade"""
    
    class Meta:
        model = Property
        exclude = ['owner', 'deleted_at', 'is_active']
        
    def validate_zip_code(self, value):
        """Validar formato do CEP"""
        if value and len(value) not in [8, 9]:
            raise serializers.ValidationError("CEP deve ter 8 ou 9 dígitos")
        return value
    
    def validate_primary_color(self, value):
        """Validar formato da cor (hex)"""
        if value and not value.startswith('#'):
            raise serializers.ValidationError("Cor deve estar no formato hexadecimal (#RRGGBB)")
        if value and len(value) != 7:
            raise serializers.ValidationError("Cor deve ter 7 caracteres (#RRGGBB)")
        return value


class PropertyPublicSerializer(serializers.ModelSerializer):
    """Serializer público (sem dados sensíveis do owner)"""
    accommodations_count = serializers.SerializerMethodField()
    images = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = ['id', 'name', 'description', 'address', 'city', 'state', 
                  'country', 'phone', 'website', 'accommodations_count', 
                  'logo', 'primary_color', 'images', 'instagram', 'facebook',
                  'youtube', 'tiktok', 'whatsapp']
    
    def get_accommodations_count(self, obj):
        return obj.accommodations.filter(is_active=True).count()


class AccommodationListSerializer(serializers.ModelSerializer):
    """Serializer para listagem de acomodações"""
    property_name = serializers.CharField(source='property.name', read_only=True)
    images_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Accommodation
        fields = ['id', 'name', 'accommodation_type', 'max_guests', 
                  'base_price', 'is_active', 'property_name', 'images_count']
    
    def get_images_count(self, obj):
        return obj.images.count()


class AccommodationDetailSerializer(serializers.ModelSerializer):
    """Serializer detalhado para acomodação"""
    property_name = serializers.CharField(source='property.name', read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Accommodation
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']


class AccommodationCreateSerializer(serializers.ModelSerializer):
    """Serializer para criação de acomodação"""
    
    class Meta:
        model = Accommodation
        exclude = ['deleted_at', 'is_active']
    
    def validate_base_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Preço deve ser maior que zero")
        return value
    
    def validate_max_guests(self, value):
        if value <= 0:
            raise serializers.ValidationError("Capacidade deve ser maior que zero")
        return value


# Manter compatibilidade com código existente
class AccommodationSerializer(AccommodationDetailSerializer):
    """Serializer para acomodações (compatibilidade)"""
    pass
