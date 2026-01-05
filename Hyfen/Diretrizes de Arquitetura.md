# Diretrizes de Arquitetura: Hyfen

**Versão:** 1.0
**Data:** 03/01/2026
**Arquiteto:** Jorge

Este documento estabelece as decisões arquitetônicas e os padrões técnicos para o desenvolvimento do Hyfen. Todas as implementações devem aderir a estas diretrizes.

## 1. Stack Tecnológica Principal

*   **Backend:** Python 3.12 com **Django 5.2 (LTS)**.
*   **API:** **Django Rest Framework (DRF)** para a construção da API REST.
*   **Frontend:** **Next.js 14+** (com App Router, TypeScript e Tailwind CSS).
*   **Banco de Dados:** **PostgreSQL 16+**.
*   **Processamento Assíncrono:** **Celery** com **Redis** como broker.
*   **Orquestração de Ambiente:** **Docker** e **Docker Compose**.

**Justificativa:** Esta stack foi escolhida por sua maturidade, estabilidade (foco em versões LTS), ecossistema robusto e escalabilidade, alinhada com as melhores práticas da indústria.

## 2. Princípios de Segurança

*   **Identificadores Únicos (UUIDs):** Todos os modelos de dados primários devem usar UUIDs como chave primária para prevenir ataques de enumeração e ofuscar dados de negócio.
*   **Autenticação via JWT:** A API será protegida usando JSON Web Tokens. O token deve conter o `user_id`, `role` e `permissions`, e ser assinado com um segredo forte.
*   **Exclusão Lógica (Soft Deletes):** Nenhum registro crítico será fisicamente apagado do banco de dados. Implementaremos um padrão de exclusão lógica (com campos como `is_active` e `deleted_at`) para garantir a integridade do histórico e a conformidade com a LGPD.
*   **Gerenciamento de Segredos:** Configurações sensíveis devem ser gerenciadas via arquivos `.env` e nunca versionadas no Git.

## 3. Arquitetura Multi-Tenant

*   **Isolamento de Dados:** Cada registro no banco de dados associado a um cliente (ex: `Property`, `Booking`) deve ter uma `ForeignKey` explícita para a conta do proprietário, garantindo que um cliente nunca possa acessar os dados de outro.
*   **Domínios Personalizados:** O sistema suportará domínios personalizados para as landing pages dos clientes através de um apontamento `CNAME` para um endereço canônico do Hyfen (ex: `domains.hyfen.com.br`).

## 4. Governança de Código (Git Workflow)

*   **Branch Principal:** A branch `main` é protegida e deve sempre representar um estado estável e implantável do produto.
*   **Feature Branches:** Todo o desenvolvimento deve ocorrer em branches separadas, criadas a partir da `main` (ex: `feature/US-1.1-setup-docker`).
*   **Pull Requests (PRs):** Nenhuma alteração é mesclada na `main` diretamente. Todo o código deve passar por um processo de Pull Request e Code Review.
*   **Merge:** Usaremos o método "Squash and Merge" para manter o histórico da `main` limpo e significativo.

## 5. Estratégia de Ambientes (Desenvolvimento vs. Produção)

*   **Ambiente de Desenvolvimento:** Para maximizar a produtividade e a simplicidade, utilizaremos um arquivo `docker-compose.yml` **unificado** na raiz do projeto. O objetivo é orquestrar todo o ecossistema (backend, frontend, banco de dados, etc.) com um único comando para o desenvolvimento local.
*   **Ambiente de Produção:** O `docker-compose.yml` **não** será usado para produção. A implantação será feita através de um pipeline de CI/CD que tratará o frontend e o backend como serviços **separados e independentes**, implantando cada um na plataforma mais adequada para sua função (ex: Vercel/Netlify para o frontend, AWS/Google Cloud/Heroku para o backend).

## 6. Documentação do Projeto

*   **Fonte da Verdade:** O código é a fonte final da verdade, mas ele deve ser suportado por uma documentação clara e acessível.
*   **Diretório `/docs`:** Um diretório `/docs` será criado na raiz do projeto para abrigar a documentação técnica e de arquitetura.
*   **Ferramenta:** Utilizaremos o **MkDocs** com o tema **Material for MkDocs**.
    *   **Justificativa:** É uma ferramenta baseada em Markdown, extremamente simples de usar, gera um site estático bonito e pesquisável, e se integra bem ao nosso fluxo de trabalho.
*   **Conteúdo:** O diretório `/docs` conterá:
    *   Cópias e versões dos nossos documentos de arquitetura.
    *   Tutoriais de setup para novos desenvolvedores.
    *   Explicações detalhadas sobre as decisões de arquitetura mais complexas.
    *   Diagramas de fluxo de dados.
*   **Documentação da API:** A documentação interativa da API (Swagger/OpenAPI) será gerada automaticamente pelo Django Rest Framework e linkada a partir da nossa documentação principal no `/docs`.

---
## 7. Experiência do Usuário em Casos de Borda

*   **Tratamento de Erros Gracioso:** A aplicação deve sempre apresentar ao usuário uma interface clara e útil em caso de erros, evitando páginas quebradas ou mensagens técnicas.
*   **Páginas de Status Personalizadas:** O Frontend (Next.js) deve implementar páginas personalizadas para os códigos de erro HTTP mais comuns, alinhadas com a identidade visual do Hyfen. No mínimo, as seguintes páginas devem ser criadas:
    *   **Página 404 (Not Found):** Para URLs que não existem.
    *   **Página 500 (Internal Server Error):** Para erros inesperados no servidor.
    *   **Página 403 (Forbidden):** Para quando um usuário tenta acessar algo que não tem permissão (embora a UI deva prevenir isso sempre que possível).


## 8. Status da Implementação - Sprint 1 ✅

**Data de Conclusão:** 04/01/2026

### Implementações Realizadas

#### Backend
- ✅ Apps `accounts` e `properties` criados
- ✅ Modelos com UUID e soft delete implementados
- ✅ Django REST Framework configurado
- ✅ Autenticação JWT com SimpleJWT
- ✅ CORS configurado para frontend
- ✅ Documentação automática com drf-spectacular

#### Modelos de Dados
- ✅ `User` - Herda de AbstractUser com UUID
- ✅ `Role` - Sistema de papéis
- ✅ `Permission` - Permissões granulares
- ✅ `Property` - Propriedades com endereço completo
- ✅ `Accommodation` - Acomodações com tipos e preços

#### API REST
- ✅ `POST /api/v1/auth/register/` - Registro de usuários
- ✅ `POST /api/v1/auth/login/` - Login com JWT
- ✅ `POST /api/v1/auth/refresh/` - Renovação de token
- ✅ `GET /api/v1/auth/me/` - Perfil do usuário
- ✅ `PATCH /api/v1/auth/me/` - Atualização de perfil

#### Documentação
- ✅ Swagger UI em `/api/docs/`
- ✅ OpenAPI Schema em `/api/schema/`
- ✅ Documentação técnica em `/Docs/`
  - README.md
  - 01-Modelagem-de-Dados.md
  - 02-API-REST.md
  - 03-Configuracao-Ambiente.md

#### Infraestrutura
- ✅ Docker Compose com 5 serviços
- ✅ PostgreSQL 16 com healthcheck
- ✅ Redis 7 para cache/filas
- ✅ Volumes persistentes
- ✅ Variáveis de ambiente configuradas

### Conformidade com Diretrizes

| Diretriz | Status | Notas |
|----------|--------|-------|
| UUIDs como PK | ✅ | Todos os modelos usam UUID |
| Autenticação JWT | ✅ | SimpleJWT configurado |
| Soft Delete | ✅ | Implementado em User, Property, Accommodation |
| Segredos em .env | ✅ | Todos os secrets em arquivos .env |
| Multi-tenant | ✅ | ForeignKey para owner em Property |
| Docker Compose | ✅ | Ambiente unificado para desenvolvimento |
| Documentação | ✅ | /Docs/ criado com MkDocs planejado |

### Próximos Passos (Sprint 2)

Conforme planejado nas diretrizes:
1. Implementar frontend com Next.js
2. Aplicar design system Hyfen
3. Criar páginas de autenticação
4. Implementar dashboard inicial

---

**Revisado por:** Sistema  
**Aprovado em:** 04/01/2026
