PlanoAcaoV2.md
Referência à Versão Anterior: PlanoAcaoV1.md
1. Changelog: Resumo das Decisões Estratégicas (V1 -> V2)
Esta versão formaliza a decisão de construir o SaaS sobre uma fundação de Longo Suporte (LTS), priorizando estabilidade, segurança e longevidade sobre o uso de tecnologias em estágio de pré-lançamento.
Diretiva de Stack de Backend:
Linguagem: Adotar Python 3.12.
Justificativa: Versão estável com suporte de segurança até Outubro de 2028. Garante um ambiente de execução maduro e compatível com o ecossistema.
Framework Principal: Adotar Django ~=5.2.
Justificativa: Versão LTS com suporte estendido previsto até Abril de 2029. Minimiza a necessidade de atualizações disruptivas no framework, permitindo foco no desenvolvimento de funcionalidades.
Banco de Dados: Adotar PostgreSQL 16 ou superior.
Justificativa: Utilizar a versão estável mais recente para maximizar performance e acesso a novas funcionalidades.
Diretiva de Configuração de Ambiente:
Centralização de Segredos: Todas as configurações sensíveis (chaves de API, senhas, etc.) devem ser gerenciadas através de um arquivo .env na raiz do backend e carregadas via python-decouple ou similar. O arquivo .env não deve ser versionado no Git.
Orquestração: O ambiente de desenvolvimento deve ser totalmente orquestrado via Docker Compose, definindo serviços para backend, frontend, db, redis, e worker.
2. Diretivas de Implementação para a Estrutura Inicial
Esta seção detalha as tarefas a serem executadas pelos desenvolvedores (ou IAs de código) para construir o esqueleto do projeto.
Tarefa 1: Estrutura do Monorepo
Criar um diretório raiz (monorepo-pousadas).
Dentro dele, criar dois diretórios principais: backend e frontend.
Tarefa 2: Estrutura do Backend (Django)
Inicializar um projeto Django dentro da pasta backend. O projeto principal deve ser nomeado core.
Criar um diretório apps para abrigar os módulos de negócio.
Dentro de apps, criar os seguintes apps Django: accounts, properties, reservations, finances, concierge_ai.
Criar um diretório api para abrigar a lógica do FastAPI, com uma subpasta v1 para versionamento.
Tarefa 3: Estrutura do Frontend (Next.js)
Inicializar um projeto Next.js padrão (com TypeScript e Tailwind CSS) dentro da pasta frontend.
Tarefa 4: Configuração da Orquestração (Docker)
Criar um docker-compose.yml na raiz, definindo os 5 serviços planejados e garantindo que o backend dependa do db e redis.
Criar um Dockerfile em backend/ que use a imagem python:3.12-slim, instale as dependências do requirements.txt e exponha a porta 8000.
Criar um Dockerfile em frontend/ que use a imagem node:20-alpine, instale as dependências via npm ci e exponha a porta 3000.
Tarefa 5: Arquivos de Dependências
Criar um arquivo backend/requirements.txt listando as bibliotecas necessárias, respeitando a diretiva de usar django~=5.2.
3. Roadmap Futuro (Diretivas para o PlanoAcaoV3.md)
Modelagem de Dados: A próxima fase de planejamento (V3) focará em detalhar a arquitetura dos models.py para cada app Django, definindo campos, relações e a lógica de isolamento de dados (multi-tenancy).
Configuração do Projeto Django: Detalhar as configurações a serem feitas no arquivo core/settings.py (registro de apps, configuração do AUTH_USER_MODEL, DATABASES, CELERY_BROKER_URL, etc.).
Definição de Endpoints da API: Esboçar a estrutura e os contratos (schemas Pydantic) para os endpoints iniciais da API v1 do FastAPI.
