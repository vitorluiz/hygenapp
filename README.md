# SaaS Gestão de Pousadas

Sistema SaaS multi-tenant para gestão de pousadas, com backend Django/FastAPI e frontend Next.js.

## 🏗️ Estrutura do Projeto

```
pousadas/
├── backend/
│   ├── core/              # Configurações Django (settings, urls, celery)
│   ├── apps/
│   │   ├── accounts/      # Usuários e multi-tenancy
│   │   ├── properties/    # Pousadas e quartos
│   │   ├── reservations/  # Sistema de reservas
│   │   ├── finances/      # Pagamentos e faturas
│   │   └── concierge_ai/  # Módulo de IA
│   ├── api/
│   │   └── v1/            # API REST versionada
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
├── frontend/              # Next.js + TypeScript + Tailwind
│   └── Dockerfile
└── docker-compose.yml
```

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados

### Subir o ambiente completo
```bash
docker-compose up --build
```

### Serviços disponíveis
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin

### Primeiros passos (após subir os containers)
```bash
# Executar migrações
docker-compose exec backend python manage.py migrate

# Criar superusuário
docker-compose exec backend python manage.py createsuperuser
```

## 📦 Tecnologias

### Backend
- Django 4.2+ (ORM, Admin, Auth)
- FastAPI (endpoints high-performance)
- Celery + Redis (tarefas assíncronas)
- PostgreSQL 15
- CrewAI + OpenAI (IA)

### Frontend
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS

## 📄 Licença

MIT
