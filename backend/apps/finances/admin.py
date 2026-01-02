from django.contrib import admin
from .models import Payment, Invoice


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'reservation', 'amount', 'method', 'status', 'payment_date']
    list_filter = ['status', 'method']
    search_fields = ['reservation__guest__name', 'reference']


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'property', 'total_amount', 'status', 'issue_date', 'due_date']
    list_filter = ['status', 'property']
    search_fields = ['invoice_number']
