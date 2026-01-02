from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound
from .models import Property
from .serializers import PropertySerializer

class CurrentPropertyView(APIView):
    """
    Retorna os dados da Pousada atual baseada no domínio acessado (via DomainMiddleware).
    Endpoint: GET /api/v1/pousada/
    """
    permission_classes = [AllowAny]  # Público, pois é a 'home' do site da pousada

    def get(self, request):
        # O middleware DomainMiddleware deve injetar current_property
        property_obj = getattr(request, 'current_property', None)

        if not property_obj:
            # Se não vier do domínio, tenta pegar pelo slug na query param ?slug=... (opcional, para dev)
            slug = request.query_params.get('slug')
            if slug:
                try:
                    property_obj = Property.objects.get(slug=slug, is_active=True)
                except Property.DoesNotExist:
                    pass
        
        if not property_obj:
            raise NotFound(detail="Nenhuma pousada identificada para este domínio.")

        serializer = PropertySerializer(property_obj)
        return Response(serializer.data)

from rest_framework.permissions import IsAuthenticated

class OwnerDashboardStatsView(APIView):
    """
    Retorna estatísticas do Dashboard do Proprietário Logado.
    Endpoint: GET /api/v1/dashboard/stats/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # 1. Tenta pegar a propriedade pelo contexto do domínio (DomainMiddleware)
            current_property = getattr(request, 'current_property', None)
            
            # Se tivermos uma propriedade no contexto, verificamos se o usuário tem acesso
            # (Seja como Owner do Tenant ou Membro)
            if current_property:
                # Checar se é owner do tenant
                is_owner = current_property.tenant.owner == request.user
                # Checar se é membro (futuro)
                # is_member = current_property.tenant.memberships.filter(user=request.user).exists()
                
                if not is_owner: # and not is_member
                    return Response({"error": "Acesso não autorizado a esta propriedade."}, status=403)
            
            else:
                # 2. Se não estiver num domínio de tenant (ex: app.hyfen.com),
                # buscamos a primeira propriedade associada ao usuário.
                
                # Buscar tenants onde o user é owner
                user_tenants = request.user.owned_tenants.all()
                if not user_tenants.exists():
                     # Tentar memberships (futuro)
                     return Response({"error": "Usuário não possui pousadas cadastradas."}, status=404)
                
                # Pega a primeira propriedade do primeiro tenant (Simulando MVP Single-Property)
                # Ideal: User selecionar qual tenant quer gerenciar se tiver > 1
                tenant = user_tenants.first()
                current_property = tenant.properties.first()
                
                if not current_property:
                    return Response({"error": "Tenant não possui propriedades configuradas."}, status=404)

            # Mock Stats
            stats = {
                "occupancy_rate": 65, # %
                "active_reservations": 12,
                "checkins_today": 3,
                "checkouts_today": 1,
                "revenue_month": 12500.00,
                "property_name": current_property.name
            }
            return Response(stats)

        except Exception as e:
             return Response({"error": str(e)}, status=500)
