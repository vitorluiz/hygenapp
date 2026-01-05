# Documentação do Projeto Hyfen

Sistema de gestão de hospedagens - SaaS para pousadas, hotéis e casas de temporada.

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Sprint 1 - Fundação](#sprint-1---fundação)
4. [Modelagem de Dados](#modelagem-de-dados)
5. [API REST](#api-rest)
6. [Autenticação](#autenticação)
7. [Configuração do Ambiente](#configuração-do-ambiente)

---

## Visão Geral

**Hyfen** é uma plataforma SaaS para democratizar a gestão de hospedagens, empoderando proprietários com uma ferramenta simples, poderosa e acessível.

### Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Backend | Django | 5.2.9 |
| API | Django REST Framework | 3.15.2 |
| Autenticação | SimpleJWT | 5.4.0 |
| Frontend | Next.js | 14+ |
| Banco de Dados | PostgreSQL | 16+ |
| Cache/Queue | Redis | 7+ |
| Infraestrutura | Docker Compose | - |

---

## Arquitetura

### Estrutura do Projeto

```
hyfen/
├── backend/
│   ├── accounts/          # Autenticação e usuários
│   ├── properties/        # Propriedades e acomodações
│   ├── core/              # Configurações Django
│   └── requirements.txt
├── frontend/
│   ├── app/               # Páginas Next.js
│   ├── components/        # Componentes React
│   └── lib/               # Utilitários
├── Docs/                  # Documentação
├── Hyfen/                 # Planejamento e diretrizes
└── docker-compose.yml
```

### Serviços Docker

- **backend** - Django API (porta 8000)
- **frontend** - Next.js (porta 3000)
- **db** - PostgreSQL (porta 5432)
- **redis** - Redis (porta 6379)
- **worker** - Celery worker

---

## Sprint 1 - Fundação

### Objetivos

Construir e validar o esqueleto do projeto, o núcleo de dados e o sistema de autenticação.

### Épicos Implementados

#### ✅ Épico 1: Estruturação do Ambiente
- Docker Compose funcional
- Variáveis de ambiente configuradas
- Superusuário criado

#### ✅ Épico 2: Modelagem e Persistência de Dados
- Apps `accounts` e `properties` criados
- Modelos com UUID e soft delete
- Admin Django configurado

#### ✅ Épico 3: Autenticação e API
- Django REST Framework configurado
- Autenticação JWT implementada
- Endpoints de registro, login e perfil
- Documentação automática (Swagger)

---

## Próximas Fases

Consulte os documentos específicos para detalhes de cada fase:

- [Fase 1: Modelagem de Dados](./01-Modelagem-de-Dados.md)
- [Fase 2: API REST e Autenticação](./02-API-REST.md)
- [Fase 3: Configuração do Ambiente](./03-Configuracao-Ambiente.md)

---

## Links Úteis

- **API Docs:** http://localhost:8000/api/docs/
- **Django Admin:** http://localhost:8000/admin/
- **Frontend:** http://localhost:3000/

---

**Última atualização:** 04/01/2026
