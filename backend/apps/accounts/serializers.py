from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from apps.accounts.models import User, Tenant, TenantMembership


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer para cadastro inicial de usuário (pessoa física)."""
    email = serializers.EmailField(required=True)
    cpf = serializers.CharField(required=True, max_length=14)
    phone = serializers.CharField(required=True, max_length=20)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'cpf', 'phone']
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está cadastrado.")
        return value
    
    def validate_cpf(self, value):
        # Remove caracteres não numéricos
        cpf_clean = ''.join(filter(str.isdigit, value))
        
        if len(cpf_clean) != 11:
            raise serializers.ValidationError("CPF deve conter 11 dígitos.")
        
        if User.objects.filter(cpf=cpf_clean).exists():
            raise serializers.ValidationError("Este CPF já está cadastrado.")
        
        return cpf_clean
    
    def create(self, validated_data):
        # Criar usuário sem senha (será definida após verificação de email)
        # Username será o email
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            cpf=validated_data['cpf'],
            phone=validated_data['phone'],
            is_active=False  # Inativo até verificar email
        )
        return user


class EmailVerificationSerializer(serializers.Serializer):
    """Serializer para verificação de email com token."""
    token = serializers.CharField(required=True)


class SetPasswordSerializer(serializers.Serializer):
    """Serializer para definir senha após verificação de email."""
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True, min_length=8)
    password_confirm = serializers.CharField(required=True, write_only=True)
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "As senhas não coincidem."})
        
        # Validar força da senha
        validate_password(data['password'])
        return data


class PasswordResetRequestSerializer(serializers.Serializer):
    """Serializer para solicitar recuperação de senha."""
    email = serializers.EmailField(required=True)
    
    def validate_email(self, value):
        if not User.objects.filter(email=value, is_active=True).exists():
            # Não revelar se o email existe ou não (segurança)
            # Mas internamente validamos
            pass
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer para confirmar nova senha na recuperação."""
    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True, min_length=8)
    password_confirm = serializers.CharField(required=True, write_only=True)
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "As senhas não coincidem."})
        
        # Validar força da senha
        validate_password(data['password'])
        return data


class TenantCreationSerializer(serializers.ModelSerializer):
    """Serializer para criação de empresa (tenant) com escolha de plano."""
    plan_id = serializers.IntegerField(required=True)
    
    class Meta:
        model = Tenant
        fields = ['name', 'slug', 'plan_id']
    
    def validate_slug(self, value):
        if Tenant.objects.filter(slug=value).exists():
            raise serializers.ValidationError("Este slug já está em uso.")
        return value
    
    def create(self, validated_data):
        plan_id = validated_data.pop('plan_id')
        user = self.context['request'].user
        
        # Criar tenant
        tenant = Tenant.objects.create(
            owner=user,
            **validated_data
        )
        
        # Criar membership como owner
        TenantMembership.objects.create(
            user=user,
            tenant=tenant,
            role='owner'
        )
        
        # TODO: Criar subscription com o plano escolhido
        # from apps.subscriptions.models import Subscription, Plan
        # plan = Plan.objects.get(id=plan_id)
        # Subscription.objects.create(tenant=tenant, plan=plan, ...)
        
        return tenant
