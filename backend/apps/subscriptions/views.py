from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Sum, Count
from .models import Subscription, Plan
from apps.properties.models import Property

class SaaSStatsView(APIView):
    """
    Retorna métricas gerais do SaaS para o Admin Dashboard.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_pousadas = Property.objects.count()
        # Assinaturas consideradas ativas no MRR (active ou trialing)
        active_subscriptions = Subscription.objects.filter(status__in=['active', 'trialing'])
        
        intro_plan_pousadas = active_subscriptions.filter(plan__name="Intro").count()
        
        # Calcular MRR (Monthly Recurring Revenue)
        # Se for muito pesado no futuro, usar annotate/aggregate no DB
        mrr = 0
        for sub in active_subscriptions:
            mrr += sub.plan.monthly_price

        # Dados agregados
        data = {
            "total_clients": total_pousadas,
            "active_subscriptions": active_subscriptions.count(),
            "mrr": float(mrr), # Serializar Decimal
            "plans_distribution": {
                "intro": intro_plan_pousadas,
                "others": active_subscriptions.count() - intro_plan_pousadas
            }
        }
        return Response(data)

class SaaSClientsView(APIView):
    """
    Lista clientes (pousadas) com status da assinatura.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        # Otimizar query com select_related (OneToOne property -> subscription)
        properties = Property.objects.select_related('subscription', 'subscription__plan').all()
        clients = []
        
        for prop in properties:
            # Acessar assinatura via OneToOne reverso (related_name='subscription')
            # Se não existir vai lançar erro? OneToOne reverso pode ser acessado direto se existir, ou via try/catch RelatedObjectDoesNotExist
            sub = getattr(prop, 'subscription', None)
            
            clients.append({
                "id": prop.id,
                "name": prop.name,
                "domain": prop.dominio_personalizado or prop.slug,
                "plan": sub.plan.name if sub else "Sem Plano",
                "status": sub.get_status_display() if sub else "Sem Assinatura",
                "renewal_date": sub.end_date if sub else None
            })
            
        return Response(clients)
