"""
Management command para popular o banco de dados com dados de desenvolvimento.
Dados baseados no arquivo pousadaspopular.xlsx
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.accounts.models import Tenant
from apps.properties.models import Property, RoomType, Room
from django.utils.text import slugify
from decimal import Decimal
import random

User = get_user_model()


class Command(BaseCommand):
    help = 'Popula o banco de dados com dados de desenvolvimento'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Iniciando seed de desenvolvimento...'))

        # Criar usuário proprietário padrão
        owner, created = User.objects.get_or_create(
            username='admin_chapada',
            defaults={
                'email': 'admin@reservadachapada.com.br',
                'first_name': 'Admin',
                'last_name': 'Chapada',
                'is_staff': True,
                'is_superuser': True,
            }
        )
        if created:
            owner.set_password('chapada2024')
            owner.save()
            self.stdout.write(self.style.SUCCESS(f'✓ Usuário criado: {owner.username} (senha: chapada2024)'))
        else:
            self.stdout.write(f'  Usuário já existe: {owner.username}')

        # Criar tenant padrão
        tenant, created = Tenant.objects.get_or_create(
            name='Reserva da Chapada',
            defaults={
                'slug': 'reserva-chapada',
                'is_active': True,
                'owner': owner,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Tenant criado: {tenant.name}'))
        else:
            self.stdout.write(f'  Tenant já existe: {tenant.name}')

        # Dados das pousadas extraídos do Excel
        pousadas_data = [
            {
                'name': 'Pousada Vento Sul',
                'type': 'pousada',
                'phone': '(65) 99951-7201',
                'email': 'atendimento@pousadaventosul.com',
                'description': 'Migrar da HSystem; Foco em IA no WhatsApp.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada Jardim da Chapada',
                'type': 'pousada',
                'phone': '(65) 99974-8443',
                'email': 'gilvanl@terra.com.br',
                'description': 'Eliminar solicitação de orçamento; Reserva imediata.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada Luz do Jamacá',
                'type': 'pousada',
                'phone': '(65) 99293-0468',
                'email': 'contato@luzdojamaca.com.br',
                'description': 'Criar site próprio para reduzir dependência de OTA.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada Meribá',
                'type': 'pousada',
                'phone': '(65) 99662-1515',
                'email': 'kaickcezar@hotmail.com',
                'description': 'Gestão de Reputação para subir nota no Booking.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Atmã Pousada',
                'type': 'pousada',
                'phone': '(65) 99982-3345',
                'email': 'contato@atmarestaurante.com.br',
                'description': 'Substituir Wix; Cross-sell com restaurante.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada do Parque',
                'type': 'pousada',
                'phone': '(65) 99671-6876',
                'email': 'pousada@pousadadoparque.com.br',
                'description': 'Gatilhos de escassez (últimos quartos); Offline-first.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Valle dos Ventos',
                'type': 'complexo',
                'phone': '(65) 99971-6464',
                'email': 'contato@morrodosventos.com.br',
                'description': 'Gestão de múltiplas unidades num painel visual.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada do Didi',
                'type': 'pousada',
                'phone': '(65) 99219-7385',
                'email': 'pousadadodidi@hotmail.com',
                'description': 'Organização básica de reservas (substituir caderno).',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada Manacá da Serra',
                'type': 'pousada',
                'phone': '(65) 99247-1251',
                'email': 'contato@manacadaserra.com.br',
                'description': 'Alinhamento de expectativas via Guia Digital.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada Flor da Chapada',
                'type': 'pousada',
                'phone': '(75) 99117-4007',
                'email': 'contato@flordachapada.com.br',
                'description': 'Captura de tráfego local (Google Maps) via motor direto.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Pousada Ágape',
                'type': 'pousada',
                'phone': '(65) 99310-2275',
                'email': 'contato@pousadaagape.com.br',
                'description': 'Gestão de múltiplos tipos de inventário (Loft vs Suíte).',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Hotel Turismo MT',
                'type': 'hotel',
                'phone': '(65) 99318-0918',
                'email': 'hotelturismomt@gmail.com',
                'description': 'Redução de custos fixos de TI (Cloud vs Legado).',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Imobiliária Chapada',
                'type': 'gestao',
                'phone': '(65) 99914-7553',
                'email': 'contato@imobiliariachapada.com.br',
                'description': 'Portal do Proprietário para prestação de contas automática.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Casa Studio Uirá',
                'type': 'casa',
                'phone': '(65) 99999-0000',
                'email': 'contato@studiouira.com.br',
                'description': 'Automação de respostas repetitivas (IA).',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
            {
                'name': 'Chalé do Jamacá',
                'type': 'chale',
                'phone': '(65) 99999-0001',
                'email': 'contato@chaledojamaca.com.br',
                'description': 'Upsell automático de pacotes românticos.',
                'city': 'Chapada dos Guimarães',
                'state': 'MT',
            },
        ]

        # Criar pousadas
        for idx, data in enumerate(pousadas_data):
            # Gerar CNPJ fictício
            cnpj = f'{random.randint(10,99)}.{random.randint(100,999)}.{random.randint(100,999)}/0001-{random.randint(10,99)}'
            
            property_obj, created = Property.objects.update_or_create(
                tenant=tenant,
                name=data['name'],
                defaults={
                    'slug': slugify(data['name']),
                    'description': data['description'],
                    'address': f'Rua Principal, {random.randint(100, 999)}',
                    'city': data['city'],
                    'state': data['state'],
                    'zip_code': '78195-000',
                    'phone': data['phone'],
                    'email': data['email'],
                    'is_active': True,
                    # Novos campos V4
                    'documento': cnpj,
                    'razao_social': f'{data["name"]} Hotelaria LTDA',
                    'telefone_contato': data['phone'],
                    'email_contato': data['email'],
                    'link_google_maps': f'https://maps.google.com/?q={slugify(data["name"])}',
                    'link_rede_social': f'https://instagram.com/{slugify(data["name"])}',
                    'horario_funcionamento': '08:00 - 22:00',
                    'dominio_personalizado': f'{slugify(data["name"])}.com.br' if idx < 5 else None,
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Pousada criada: {property_obj.name}'))
                
                # Criar tipos de quarto para cada pousada
                room_types = [
                    ('Suíte Standard', Decimal('250.00'), 2),
                    ('Suíte Luxo', Decimal('450.00'), 2),
                    ('Suíte Master', Decimal('650.00'), 4),
                ]
                
                for rt_name, price, capacity in room_types:
                    room_type, _ = RoomType.objects.get_or_create(
                        property=property_obj,
                        name=rt_name,
                        defaults={
                            'description': f'{rt_name} com todas as comodidades',
                            'base_price': price,
                            'max_guests': capacity,
                        }
                    )
                    
                    # Criar quartos para cada tipo
                    num_rooms = random.randint(2, 5)
                    for i in range(1, num_rooms + 1):
                        Room.objects.get_or_create(
                            room_type=room_type,
                            number=f'{rt_name[0]}{i:02d}',
                            defaults={
                                'floor': ((i - 1) // 3) + 1,
                                'is_active': True,
                            }
                        )
            else:
                self.stdout.write(f'  Pousada já existe: {property_obj.name}')

        # Resumo final
        total_properties = Property.objects.count()
        total_rooms = Room.objects.count()
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 50))
        self.stdout.write(self.style.SUCCESS(f'Seed concluído com sucesso!'))
        self.stdout.write(self.style.SUCCESS(f'Total de pousadas: {total_properties}'))
        self.stdout.write(self.style.SUCCESS(f'Total de quartos: {total_rooms}'))
        self.stdout.write(self.style.SUCCESS('=' * 50))
