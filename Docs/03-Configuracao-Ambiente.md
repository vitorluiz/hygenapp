# Fase 3: Configuração do Ambiente

Documentação completa da configuração do ambiente de desenvolvimento.

---

## Docker Compose

### Arquitetura

O projeto utiliza 5 serviços Docker:

```yaml
services:
  - db          # PostgreSQL 16
  - redis       # Redis 7
  - backend     # Django API
  - worker      # Celery Worker
  - frontend    # Next.js
```

### docker-compose.yml

```yaml
services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app:z
    ports:
      - "8000:8000"
    env_file:
      - .env
      - ./backend/.env
    environment:
      - PYTHONPATH=/app
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  worker:
    build: ./backend
    command: celery -A core worker -l info
    volumes:
      - ./backend:/app
    env_file:
      - .env
      - ./backend/.env
    depends_on:
      - backend
      - redis

  frontend:
    build: ./frontend
    command: npm run dev
    volumes:
      - ./frontend:/app:z
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"
    env_file:
      - ./frontend/.env.local
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## Variáveis de Ambiente

### Arquivo: `.env` (raiz)

```env
# PostgreSQL
POSTGRES_USER=hyfen_user
POSTGRES_PASSWORD=HyfenDB2026SecurePass!
POSTGRES_DB=hyfen_db

# Django
DJANGO_SECRET_KEY=ukWIOZQ7q7uRDp3HLAwXHnnRmRD6bW9WMCjK5Qm0iE1gGBqsQTWtwc4S8duKCGd/i3s=
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### Arquivo: `backend/.env`

```env
# Database
DATABASE_URL=postgresql://hyfen_user:HyfenDB2026SecurePass!@db:5432/hyfen_db

# Redis
REDIS_URL=redis://redis:6379/0

# Email (desenvolvimento)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@hyfen.com.br
```

### Arquivo: `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Backend - Django

### Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Comando padrão
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### requirements.txt

```txt
Django==5.2.9
djangorestframework==3.15.2
djangorestframework-simplejwt==5.4.0
psycopg2-binary==2.9.10
python-decouple==3.8
celery==5.4.0
redis==5.2.1
dj-database-url==2.3.0
django-cors-headers==4.6.0
drf-spectacular==0.29.0
```

### Estrutura

```
backend/
├── accounts/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── properties/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   └── models.py
├── core/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── Dockerfile
├── manage.py
└── requirements.txt
```

---

## Frontend - Next.js

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código
COPY . .

# Comando padrão
CMD ["npm", "run", "dev"]
```

### package.json

```json
{
  "name": "hyfen-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

### Estrutura

```
frontend/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── public/
├── Dockerfile
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Comandos Úteis

### Iniciar o Sistema

```bash
# Iniciar todos os serviços
docker compose up

# Iniciar em background
docker compose up -d

# Ver logs
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f backend
```

### Backend

```bash
# Criar migrações
docker compose exec backend python manage.py makemigrations

# Aplicar migrações
docker compose exec backend python manage.py migrate

# Criar superusuário
docker compose exec backend python manage.py createsuperuser

# Shell do Django
docker compose exec backend python manage.py shell

# Coletar arquivos estáticos
docker compose exec backend python manage.py collectstatic
```

### Frontend

```bash
# Instalar dependências
docker compose exec frontend npm install

# Build de produção
docker compose exec frontend npm run build

# Lint
docker compose exec frontend npm run lint
```

### Banco de Dados

```bash
# Acessar PostgreSQL
docker compose exec db psql -U hyfen_user -d hyfen_db

# Backup
docker compose exec db pg_dump -U hyfen_user hyfen_db > backup.sql

# Restore
docker compose exec -T db psql -U hyfen_user hyfen_db < backup.sql

# Resetar banco (CUIDADO!)
docker compose exec db psql -U hyfen_user -d hyfen_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

### Redis

```bash
# Acessar Redis CLI
docker compose exec redis redis-cli

# Ver todas as chaves
docker compose exec redis redis-cli KEYS '*'

# Limpar cache
docker compose exec redis redis-cli FLUSHALL
```

### Docker

```bash
# Parar serviços
docker compose stop

# Parar e remover containers
docker compose down

# Parar, remover containers e volumes
docker compose down -v

# Rebuild de imagens
docker compose build

# Rebuild sem cache
docker compose build --no-cache

# Ver status dos serviços
docker compose ps
```

---

## Portas Utilizadas

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 8000 | http://localhost:8000 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |

---

## Healthchecks

### PostgreSQL

```bash
pg_isready -U hyfen_user -d hyfen_db
```

### Redis

```bash
redis-cli ping
```

### Backend

```bash
curl http://localhost:8000/admin/
```

### Frontend

```bash
curl http://localhost:3000/
```

---

## Troubleshooting

### Backend não inicia

```bash
# Ver logs
docker compose logs backend

# Verificar se o banco está pronto
docker compose exec db pg_isready -U hyfen_user

# Reinstalar dependências
docker compose exec backend pip install -r requirements.txt
```

### Frontend não inicia

```bash
# Ver logs
docker compose logs frontend

# Limpar node_modules
docker compose exec frontend rm -rf node_modules
docker compose exec frontend npm install
```

### Banco de dados com problemas

```bash
# Verificar conexão
docker compose exec backend python manage.py dbshell

# Verificar migrações
docker compose exec backend python manage.py showmigrations

# Resetar migrações (CUIDADO!)
docker compose exec backend python manage.py migrate --fake accounts zero
docker compose exec backend python manage.py migrate accounts
```

### Permissões de arquivo

```bash
# Corrigir permissões (Linux/Mac)
sudo chown -R $USER:$USER backend/ frontend/
```

---

## Segurança

### Produção

Para ambiente de produção, altere:

1. **DEBUG=False** no `.env`
2. **SECRET_KEY** - Gere uma nova chave segura
3. **ALLOWED_HOSTS** - Adicione seu domínio
4. **DATABASE_PASSWORD** - Use senha forte
5. **CORS_ALLOWED_ORIGINS** - Adicione apenas domínios confiáveis
6. **HTTPS** - Configure SSL/TLS
7. **Gunicorn** - Use em vez de runserver
8. **Nginx** - Proxy reverso

---

**Voltar:** [README](./README.md)
