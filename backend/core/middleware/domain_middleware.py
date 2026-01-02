from django.utils.deprecation import MiddlewareMixin
from django.http import Http404
from apps.properties.models import Property
import logging

logger = logging.getLogger(__name__)

class DomainMiddleware(MiddlewareMixin):
    """
    Middleware para identificar a Pousada baseada no domínio da requisição (Host header).
    Adiciona o objeto 'property' ao request se encontrado.
    """
    
    def process_request(self, request):
        host = request.META.get('HTTP_X_TENANT_HOST')
        if not host:
            host = request.get_host().split(':')[0]  # Remove porta se existir
        
        # Ignorar localhost/127.0.0.1 em desenvolvimento, ou tratar domínios de sistema
        if host in ['localhost', '127.0.0.1', 'testserver', 'app.seuservico.com']:
            request.current_property = None
            return

        try:
            # Tenta encontrar pela propriedade 'dominio_personalizado'
            property_obj = Property.objects.get(dominio_personalizado=host, is_active=True)
            request.current_property = property_obj
            logger.info(f"Domínio identificado: {host} -> Pousada: {property_obj.name}")
            
        except Property.DoesNotExist:
            logger.warning(f"Domínio não encontrado: {host}")
            request.current_property = None
            # Opcional: Levantar 404 se quiser forçar que apenas domínios válidos acessem
            # raise Http404("Pousada não encontrada para este domínio.")
