# Script para definir senha de usuário
# Uso: docker compose exec backend python set_password.py <username>

import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User
from getpass import getpass

if len(sys.argv) < 2:
    print('❌ Uso: python set_password.py <username>')
    sys.exit(1)

username = sys.argv[1]

try:
    user = User.objects.get(username=username)
    password = getpass(f'Digite a nova senha para {username}: ')
    password_confirm = getpass('Confirme a senha: ')
    
    if password != password_confirm:
        print('❌ As senhas não coincidem!')
        sys.exit(1)
    
    user.set_password(password)
    user.save()
    print(f'✅ Senha definida com sucesso para {user.username}!')
    print(f'   Email: {user.email}')
    print(f'   Is superuser: {user.is_superuser}')
    print(f'   Is active: {user.is_active}')
except User.DoesNotExist:
    print(f'❌ Usuário {username} não encontrado!')
    sys.exit(1)
