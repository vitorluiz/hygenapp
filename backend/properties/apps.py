from django.apps import AppConfig


class PropertiesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'properties'
    
    def ready(self):
        import properties.signals  # Registra os signals
        import properties.auditlog  # Registra auditoria
