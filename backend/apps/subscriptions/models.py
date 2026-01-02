from django.db import models
from apps.properties.models import Property
from django.utils import timezone

class Plan(models.Model):
    """
    Planos de assinatura oferecidos pelo SaaS.
    """
    name = models.CharField(max_length=100, help_text="Ex: Básico, Pro, Enterprise")
    gateway_code = models.CharField(max_length=100, blank=True, help_text="ID do plano no Stripe/Gateway")
    monthly_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Valor Mensal")
    description = models.TextField(blank=True, verbose_name="Descrição")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Plano"
        verbose_name_plural = "Planos"

    def __str__(self):
        return f"{self.name} (R$ {self.monthly_price})"


class Subscription(models.Model):
    """
    Assinatura de uma pousada (Tenant) a um Plano.
    """
    STATUS_CHOICES = [
        ('active', 'Ativa'),
        ('trialing', 'Período de Teste'),
        ('past_due', 'Pagamento Pendente'),
        ('canceled', 'Cancelada'),
        ('unpaid', 'Inadimplente'),
    ]

    property = models.OneToOneField(Property, on_delete=models.CASCADE, related_name='subscription', verbose_name="Pousada")
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT, related_name='subscriptions', verbose_name="Plano")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='trialing')
    start_date = models.DateField(default=timezone.now, verbose_name="Data Início")
    end_date = models.DateField(null=True, blank=True, verbose_name="Data Fim")
    gateway_subscription_id = models.CharField(max_length=100, blank=True, help_text="ID da assinatura no Gateway")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Assinatura"
        verbose_name_plural = "Assinaturas"

    def __str__(self):
        return f"{self.property.name} - {self.get_status_display()}"


class Payment(models.Model):
    """
    Registro de pagamentos das assinaturas.
    """
    STATUS_CHOICES = [
        ('succeeded', 'Sucesso'),
        ('pending', 'Pendente'),
        ('failed', 'Falhou'),
        ('refunded', 'Reembolsado'),
    ]

    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='payments', verbose_name="Assinatura")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Valor Pago")
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name="Data Pagamento")
    gateway_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    gateway_transaction_id = models.CharField(max_length=100, blank=True, verbose_name="ID Transação Gateway")

    class Meta:
        verbose_name = "Pagamento"
        verbose_name_plural = "Pagamentos"
        ordering = ['-payment_date']

    def __str__(self):
        return f"Pagamento {self.id} - R$ {self.amount_paid} ({self.gateway_status})"
