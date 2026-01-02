from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.views import APIRootView
from apps.properties.views import CurrentPropertyView, OwnerDashboardStatsView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from apps.subscriptions.views import SaaSStatsView, SaaSClientsView

# Router para ViewSets futuros
router = DefaultRouter()

@api_view(['GET'])
def api_status(request):
    """Endpoint de status da API"""
    return Response({
        'status': 'online',
        'version': 'v1',
        'message': 'API do SaaS Pousadas funcionando!'
    })

urlpatterns = [
    # API Root
    path('', APIRootView.as_view(), name='api-root'),
    path('status/', api_status, name='api-status'),
    
    # Pousada Public API (Site)
    path('pousada/', CurrentPropertyView.as_view(), name='current-property'),
    
    # Owner Dashboard API
    path('dashboard/stats/', OwnerDashboardStatsView.as_view(), name='owner-dashboard-stats'),

    # Autenticação JWT
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # SaaS Admin API
    path('saas/stats/', SaaSStatsView.as_view(), name='saas-stats'),
    path('saas/clients/', SaaSClientsView.as_view(), name='saas-clients'),
]
