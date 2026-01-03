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

