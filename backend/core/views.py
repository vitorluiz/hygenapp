from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class APIRootView(APIView):
    """
    API Root: Lista os endpoints principais.
    """
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        return Response({
            'status': 'online',
            'endpoints': {
                'pousada': '/api/v1/pousada/',
                'auth': '/api/v1/auth/token/',
                'admin_saas': '/api/v1/saas/stats/',
                'owner_dashboard': '/api/v1/dashboard/stats/',
            }
        })
