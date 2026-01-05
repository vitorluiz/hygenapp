# Hyfen - Sistema de Gestão de Hospedagens

Bem-vindo à documentação oficial do **Hyfen**, um sistema SaaS completo para gestão de pousadas, hotéis e casas de temporada.

## 🎯 Visão Geral

O Hyfen é uma plataforma moderna que permite aos proprietários de hospedagens gerenciar suas propriedades, acomodações e reservas de forma eficiente e profissional.

### Principais Funcionalidades

- **Dashboard Intuitivo**: Visualize métricas e gerencie suas propriedades
- **Gestão de Propriedades**: Cadastre e gerencie múltiplas propriedades
- **Landing Pages Públicas**: Cada propriedade tem sua própria página pública com URL personalizada
- **Gestão de Acomodações**: Controle quartos, chalés e outros tipos de hospedagem
- **Sistema de Reservas**: Gerencie reservas e disponibilidade
- **Integração com Redes Sociais**: Links para Instagram, Facebook, YouTube, TikTok e WhatsApp

## 🚀 Início Rápido

```bash
# Clone o repositório
git clone https://github.com/vitorluiz/hyfenapp.git
cd hyfenapp

# Inicie os serviços
docker compose up -d

# Acesse a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📚 Documentação

- [Sobre o Projeto](overview/about.md)
- [Arquitetura](overview/architecture.md)
- [Guia de Instalação](guides/installation.md)
- [API Reference](api/authentication.md)

## 🛠️ Tecnologias

### Backend
- Python 3.12
- Django 5.1
- Django REST Framework
- PostgreSQL 16
- Redis 7

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)

## 📖 Sprints

O projeto está sendo desenvolvido em sprints:

- [Sprint 1](sprints/sprint-1.md): Configuração inicial e autenticação
- [Sprint 2](sprints/sprint-2.md): Dashboard e gestão de propriedades

## 🤝 Contribuindo

Consulte nosso [Git Workflow](development/git-workflow.md) para informações sobre como contribuir.

## 📄 Licença

Este projeto está sob licença proprietária.

---

**Desenvolvido com ❤️ por Vitor Luiz**
