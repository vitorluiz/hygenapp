import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

try:
    user = User.objects.get(username='vitorluiz')
    user.set_password('SenhaSegura123')
    user.save()
    print(f'✅ Senha definida com sucesso para {user.username}!')
    print(f'   Email: {user.email}')
    print(f'   Is superuser: {user.is_superuser}')
    print(f'   Is active: {user.is_active}')
except User.DoesNotExist:
    print('❌ Usuário vitorluiz não encontrado!')
