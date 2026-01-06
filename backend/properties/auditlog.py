"""
Configuração de auditoria para o app properties.
Registra modelos para rastreamento automático de mudanças.
"""
from auditlog.registry import auditlog
from .models import Property, Accommodation, PropertyAccess, Image

# Registrar modelos para auditoria
auditlog.register(Property)
auditlog.register(Accommodation)
auditlog.register(PropertyAccess)
auditlog.register(Image)
