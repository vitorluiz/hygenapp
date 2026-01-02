from django.core.management.base import BaseCommand
from apps.subscriptions.models import Plan, Subscription
from apps.properties.models import Property
from django.utils import timezone

class Command(BaseCommand):
    help = 'Inicializa planos e assinaturas de teste'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Criando planos de assinatura...'))

        # Criar Planos
        plans_data = [
            {
                'name': 'Essencial',
                'gateway_code': 'plan_basic_1',
                'monthly_price': '199.00',
                'description': 'Ideal para pousadas de até 10 quartos.'
            },
            {
                'name': 'Profissional',
                'gateway_code': 'plan_pro_1',
                'monthly_price': '399.00',
                'description': 'Tudo do Essencial + IA Concierge.'
            }
        ]

        plans = {}
        for data in plans_data:
            plan, created = Plan.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
            plans[data['name']] = plan
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Plano criado: {plan.name}'))
            else:
                self.stdout.write(f'  Plano já existe: {plan.name}')

        # Criar Assinaturas para algumas pousadas
        self.stdout.write(self.style.NOTICE('\nAtribuindo assinaturas...'))
        
        # Pousada Vento Sul -> Profissional
        try:
            vento_sul = Property.objects.get(name='Pousada Vento Sul')
            sub, created = Subscription.objects.get_or_create(
                property=vento_sul,
                defaults={
                    'plan': plans['Profissional'],
                    'status': 'active',
                    'start_date': timezone.now().date(),
                    'gateway_subscription_id': 'sub_test_123'
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Assinatura criada para {vento_sul.name} (Plano: Profissional)'))
            else:
                self.stdout.write(f'  Assinatura já existe para {vento_sul.name}')
        except Property.DoesNotExist:
            self.stdout.write(self.style.ERROR('Pousada Vento Sul não encontrada. Rode seed_dev primeiro.'))

        # Atma -> Essencial
        try:
            atma = Property.objects.get(name='Atmã Pousada')
            sub, created = Subscription.objects.get_or_create(
                property=atma,
                defaults={
                    'plan': plans['Essencial'],
                    'status': 'trialing',
                    'start_date': timezone.now().date(),
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Assinatura criada para {atma.name} (Plano: Essencial)'))
        except Property.DoesNotExist:
            pass

        self.stdout.write(self.style.SUCCESS('\nInicialização de planos concluída!'))
