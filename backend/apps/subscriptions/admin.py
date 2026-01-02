from django.contrib import admin
from .models import Plan, Subscription, Payment

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'monthly_price', 'gateway_code', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('property', 'plan', 'status', 'start_date', 'gateway_subscription_id')
    list_filter = ('status', 'plan', 'start_date')
    search_fields = ('property__name', 'property__email', 'gateway_subscription_id')
    autocomplete_fields = ['property', 'plan']
    
    actions = ['mark_as_canceled', 'mark_as_active']

    @admin.action(description='Marcar assinaturas selecionadas como CANCELADA')
    def mark_as_canceled(self, request, queryset):
        queryset.update(status='canceled')

    @admin.action(description='Marcar assinaturas selecionadas como ATIVA')
    def mark_as_active(self, request, queryset):
        queryset.update(status='active')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('subscription', 'amount_paid', 'payment_date', 'gateway_status')
    list_filter = ('gateway_status', 'payment_date')
    search_fields = ('subscription__property__name', 'gateway_transaction_id')
    readonly_fields = ('payment_date',)
