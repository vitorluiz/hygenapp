from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from apps.accounts.models import User
from apps.accounts.serializers import (
    UserRegistrationSerializer,
    EmailVerificationSerializer,
    SetPasswordSerializer,
    TenantCreationSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)


class UserRegistrationView(generics.CreateAPIView):
    """
    Cadastro inicial de usuário (pessoa física).
    Cria usuário inativo e envia email de verificação.
    """
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Gerar token de verificação
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # URL de verificação (frontend)
        verification_url = f"{settings.FRONTEND_URL}/verify-email?uid={uid}&token={token}"
        
        # Enviar email de verificação
        send_mail(
            subject='Hyfen - Verifique seu email',
            message=f'Olá {user.first_name},\n\nClique no link abaixo para verificar seu email e definir sua senha:\n\n{verification_url}\n\nEquipe Hyfen',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        
        return Response({
            'message': 'Cadastro realizado com sucesso! Verifique seu email para continuar.',
            'email': user.email
        }, status=status.HTTP_201_CREATED)


class VerifyEmailView(APIView):
    """
    Verificar email do usuário usando token.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({
                'error': 'Link de verificação inválido.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not default_token_generator.check_token(user, token):
            return Response({
                'error': 'Link de verificação expirado ou inválido.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'message': 'Email verificado com sucesso!',
            'uid': uid,
            'token': token
        }, status=status.HTTP_200_OK)


class SetPasswordView(APIView):
    """
    Definir senha após verificação de email.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = SetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        uid = request.data.get('uid')
        token = request.data.get('token')
        
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({
                'error': 'Link inválido.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not default_token_generator.check_token(user, token):
            return Response({
                'error': 'Link expirado ou inválido.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Definir senha e ativar usuário
        user.set_password(serializer.validated_data['password'])
        user.is_active = True
        user.save()
        
        return Response({
            'message': 'Senha definida com sucesso! Você já pode fazer login.'
        }, status=status.HTTP_200_OK)


class CreateTenantView(generics.CreateAPIView):
    """
    Criar empresa (tenant) e escolher plano.
    Requer autenticação.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = TenantCreationSerializer
    
    def create(self, request, *args, **kwargs):
        # Verificar se usuário já possui tenant
        if request.user.owned_tenants.exists():
            return Response({
                'error': 'Você já possui uma empresa cadastrada.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tenant = serializer.save()
        
        return Response({
            'message': 'Empresa criada com sucesso!',
            'tenant': {
                'id': tenant.id,
                'name': tenant.name,
                'slug': tenant.slug
            }
        }, status=status.HTTP_201_CREATED)


class PasswordResetRequestView(APIView):
    """
    Solicitar recuperação de senha.
    Envia email com link para redefinir senha.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email, is_active=True)
            
            # Gerar token de recuperação
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # URL de recuperação (frontend)
            reset_url = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
            
            # Enviar email de recuperação
            send_mail(
                subject='Hyfen - Recuperação de Senha',
                message=f'Olá {user.first_name},\n\nRecebemos uma solicitação para redefinir sua senha.\n\nClique no link abaixo para criar uma nova senha:\n\n{reset_url}\n\nSe você não solicitou esta alteração, ignore este email.\n\nEquipe Hyfen',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except User.DoesNotExist:
            # Não revelar se o email existe ou não (segurança)
            pass
        
        # Sempre retornar sucesso (segurança)
        return Response({
            'message': 'Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.'
        }, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    """
    Confirmar nova senha na recuperação.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        uid = serializer.validated_data['uid']
        token = serializer.validated_data['token']
        
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({
                'error': 'Link de recuperação inválido.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not default_token_generator.check_token(user, token):
            return Response({
                'error': 'Link de recuperação expirado ou inválido.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Definir nova senha
        user.set_password(serializer.validated_data['password'])
        user.save()
        
        return Response({
            'message': 'Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.'
        }, status=status.HTTP_200_OK)
