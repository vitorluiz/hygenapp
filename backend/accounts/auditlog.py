"""
Configuração de auditoria para o app accounts.
Registra modelo User para rastreamento de mudanças.
"""
from auditlog.registry import auditlog
from .models import User

# Registrar User para auditoria
auditlog.register(User)
