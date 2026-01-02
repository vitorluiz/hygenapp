from django.db import models
from apps.properties.models import Property
from apps.reservations.models import Reservation


class Payment(models.Model):
    """Payment model."""
    METHOD_CHOICES = [
        ('cash', 'Dinheiro'),
        ('credit_card', 'Cartão de Crédito'),
        ('debit_card', 'Cartão de Débito'),
        ('pix', 'PIX'),
        ('bank_transfer', 'Transferência Bancária'),
        ('other', 'Outro'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('paid', 'Pago'),
        ('refunded', 'Reembolsado'),
        ('cancelled', 'Cancelado'),
    ]
    
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(null=True, blank=True)
    reference = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Pagamento'
        verbose_name_plural = 'Pagamentos'
    
    def __str__(self):
        return f"Pagamento {self.id} - R$ {self.amount}"


class Invoice(models.Model):
    """Invoice model."""
    STATUS_CHOICES = [
        ('draft', 'Rascunho'),
        ('sent', 'Enviada'),
        ('paid', 'Paga'),
        ('overdue', 'Vencida'),
        ('cancelled', 'Cancelada'),
    ]
    
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='invoices')
    reservation = models.ForeignKey(Reservation, on_delete=models.SET_NULL, null=True, blank=True, related_name='invoices')
    invoice_number = models.CharField(max_length=50, unique=True)
    issue_date = models.DateField()
    due_date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Fatura'
        verbose_name_plural = 'Faturas'
    
    def __str__(self):
        return f"Fatura {self.invoice_number}"
