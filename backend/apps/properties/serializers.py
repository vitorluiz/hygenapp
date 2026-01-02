from rest_framework import serializers
from apps.properties.models import Property, RoomType, Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'number', 'floor', 'notes', 'is_active']

class RoomTypeSerializer(serializers.ModelSerializer):
    # Opcional: incluir quartos disponíveis, mas vamos simplificar por enquanto
    class Meta:
        model = RoomType
        fields = ['id', 'name', 'description', 'max_guests', 'base_price', 'amenities', 'images']

class PropertySerializer(serializers.ModelSerializer):
    room_types = RoomTypeSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'name', 'slug', 'description', 'address', 'city', 'state', 'zip_code',
            'phone', 'email', 'website', 'cover_image',
            # Campos V4
            'documento', 'razao_social', 'telefone_contato', 'email_contato',
            'link_google_maps', 'link_rede_social', 'horario_funcionamento', 'dominio_personalizado',
            'room_types'
        ]
