import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from properties.models import Property, Accommodation, Image, PropertyAccess
from django.utils.text import slugify

User = get_user_model()

REAL_POUSADAS = [
  {
    "name": "Atmã Pousada",
    "description": "Oferece Wi-Fi grátis em toda a propriedade e uma belíssima vista para a montanha. Conta com serviço de quarto e um terraço ao ar livre para relaxamento.",
    "accommodation_types": [
        {"name": "Quarto Duplo", "type": "room", "price": 2145, "guests": 2},
        {"name": "Suíte com Varanda", "type": "suite", "price": 2500, "guests": 2}
    ],
    "approximate_price": 2145.00
  },
  {
    "name": "Pousada do DIDI",
    "description": "Possui um amplo jardim e área de churrasqueira. A propriedade dispõe de piscina ao ar livre e quartos equipados com ar-condicionado e Wi-Fi gratuito.",
    "accommodation_types": [
        {"name": "Quarto Duplo Standard", "type": "room", "price": 350, "guests": 2},
        {"name": "Quarto Triplo", "type": "room", "price": 450, "guests": 3}
    ],
    "approximate_price": 350.00
  },
  {
    "name": "Pousada La Belle de Jour",
    "description": "Oferece acomodações charmosas com terraço ou varanda, além de uma piscina ao ar livre cercada por um jardim bem cuidado.",
    "accommodation_types": [
        {"name": "Quarto Queen", "type": "room", "price": 444, "guests": 2},
        {"name": "Quarto Duplo Econômico", "type": "room", "price": 380, "guests": 2}
    ],
    "approximate_price": 444.00
  },
  {
    "name": "Pousada Luz do Jamacá",
    "description": "Uma pousada tranquila com jardim, oferecendo quartos com ar-condicionado, banheiro privativo e varanda térrea para contemplar a natureza.",
    "accommodation_types": [
        {"name": "Chalé", "type": "cabin", "price": 335, "guests": 2},
        {"name": "Suíte Familiar", "type": "suite", "price": 500, "guests": 4}
    ],
    "approximate_price": 335.00
  },
  {
    "name": "Pousada Café Villa Monnaié",
    "description": "Localizada no coração da Chapada, oferece serviço de quarto e Wi-Fi gratuito. Cada unidade conta com um terraço privativo.",
    "accommodation_types": [
        {"name": "Suíte Deluxe", "type": "suite", "price": 398, "guests": 2},
        {"name": "Quarto Duplo", "type": "room", "price": 300, "guests": 2}
    ],
    "approximate_price": 398.00
  },
  {
    "name": "Pousada Villa Guimaraes",
    "description": "Dispõe de uma excelente infraestrutura com piscina ao ar livre, lounge compartilhado e um café da manhã muito elogiado pelos hóspedes.",
    "accommodation_types": [
        {"name": "Quarto Duplo", "type": "room", "price": 718, "guests": 2},
        {"name": "Quarto Família", "type": "room", "price": 900, "guests": 4}
    ],
    "approximate_price": 718.00
  },
  {
    "name": "Pousada Meribá",
    "description": "Oferece um ambiente acolhedor com piscina e lounge. É conhecida pelo atendimento atencioso de seus funcionários e boa localização.",
    "accommodation_types": [
        {"name": "Quarto Duplo Standard", "type": "room", "price": 280, "guests": 2},
        {"name": "Quarto Triplo", "type": "room", "price": 400, "guests": 3}
    ],
    "approximate_price": 280.00
  },
  {
    "name": "Casa Astral",
    "description": "Localizada em uma área privilegiada, a Casa Astral oferece acomodações modernas com piscina ao ar livre e Wi-Fi gratuito.",
    "accommodation_types": [
        {"name": "Suíte", "type": "suite", "price": 450, "guests": 2},
        {"name": "Quarto Duplo com Vista", "type": "room", "price": 550, "guests": 2}
    ],
    "approximate_price": 450.00
  }
]

# Additional fake names to reach necessary count
EXTRA_NAMES = [
    "Pousada Morro dos Ventos",
    "Pousada Véu de Noiva",
    "Pousada Cidade de Pedra",
    "Chalés do Cerrado",
    "EcoPousada Chapada"
]

class Command(BaseCommand):
    help = 'Seeds database with real simulation data for Sprint 3'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting Real Simulation Seed...'))

        # 1. Create 5 standard users (usuario1 - usuario5)
        users = []
        for i in range(1, 6):
            username = f'usuario{i}'
            email = f'usuario{i}@example.com'
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password='12345678',
                    is_owner=True
                )
                self.stdout.write(f'Created user: {username}')
                users.append(user)
            else:
                users.append(User.objects.get(username=username))

        # Assign 1 real property to each of these 5 users
        for i, user in enumerate(users):
            data = REAL_POUSADAS[i]
            self.create_property_for_user(user, data)

        # 2. Create 4 Multi-Tenant users
        # Configs: User 1 (1 prop), User 2 (2 props), User 3 (4 props), User 4 (1 prop)
        # Total props needed: 1 + 2 + 4 + 1 = 8 properties.
        # We have 3 remaining real pousadas (index 5, 6, 7).
        # We need 5 more artificial properties.
        
        multi_configs = [1, 2, 4, 1]
        
        # Pool of property data: remaining real ones + extra names
        prop_data_pool = []
        
        # Add remaining real pousadas
        for i in range(5, 8):
            prop_data_pool.append(REAL_POUSADAS[i])
            
        # Create synthetic data for the rest
        base_desc = "Uma linda pousada em meio à natureza da Chapada, com café da manhã e ótima localização."
        for name in EXTRA_NAMES:
            prop_data_pool.append({
                "name": name,
                "description": base_desc,
                "accommodation_types": [
                    {"name": "Chalé Standard", "type": "cabin", "price": 400, "guests": 2},
                    {"name": "Chalé Família", "type": "cabin", "price": 600, "guests": 4}
                ],
                "approximate_price": 400.00
            })

        pool_index = 0

        for i, num_props in enumerate(multi_configs):
            username = f'multi_tenant_{i+1}'
            email = f'multi{i+1}@example.com'
            
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password='12345678',
                    is_owner=True
                )
                self.stdout.write(f'Created multi-tenant user: {username}')
            else:
                user = User.objects.get(username=username)

            # Create properties for this user
            for _ in range(num_props):
                if pool_index < len(prop_data_pool):
                    data = prop_data_pool[pool_index]
                    pool_index += 1
                else:
                    # Fallback if pool runs out
                    data = {
                         "name": f"Pousada Extra {pool_index}",
                         "description": base_desc,
                         "accommodation_types": [{"name": "Standard", "type": "room", "price": 300, "guests": 2}]
                    }
                    pool_index += 1
                
                self.create_property_for_user(user, data)

        self.stdout.write(self.style.SUCCESS('Seeding Completed Successfully!'))

    def create_property_for_user(self, user, data):
        # Create Property
        prop_slug = slugify(data['name'])
        # Ensure unique slug
        original_slug = prop_slug
        counter = 1
        while Property.objects.filter(slug=prop_slug).exists():
            prop_slug = f"{original_slug}-{counter}"
            counter += 1

        if Property.objects.filter(name=data['name'], owner=user).exists():
            self.stdout.write(f"Property {data['name']} already exists for {user.username}")
            return

        property_obj = Property.objects.create(
            owner=user,
            name=data['name'],
            description=data['description'],
            slug=prop_slug,
            address="Chapada dos Guimarães, MT",
            city="Chapada dos Guimarães",
            state="MT",
            primary_color=random.choice(['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6'])
        )
        
        # Use signal or manually create owner access just in case
        if not PropertyAccess.objects.filter(user=user, property=property_obj).exists():
             PropertyAccess.objects.create(user=user, property=property_obj, role='OWNER')

        self.stdout.write(f"  Created Property: {property_obj.name}")

        # Create Accommodations
        for acc_data in data['accommodation_types']:
            Accommodation.objects.create(
                property=property_obj,
                name=acc_data['name'],
                accommodation_type=acc_data['type'],
                max_guests=acc_data['guests'],
                beds=1,
                bathrooms=1,
                description=f"Acomodação confortável do tipo {acc_data['name']}",
                base_price=acc_data['price'],
                is_active=True
            )
        
            self.stdout.write(f"    - Added Accommodation: {acc_data['name']}")
