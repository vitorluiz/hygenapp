# PROMPT DE COMANDO PARA ANTIGRAVITY: SETUP DE PROJETO SAAS

**Objetivo:** Automatizar a criação da estrutura completa de um projeto SaaS multi-tenant, seguindo uma arquitetura monorepo com Backend (Django/FastAPI) e Frontend (Next.js), orquestrado por Docker.

**Contexto:** O sistema é um SaaS para gestão de pousadas, com funcionalidades de reserva, automação de marketing e um futuro add-on de IA. A estrutura foi planejada para ser escalável e organizada.

**Instruções:**
Execute os seguintes comandos e crie os arquivos exatamente como especificado, na ordem correta. Comece a partir do diretório atual, que deve ser uma pasta vazia chamada `monorepo-pousadas`.

---

### **PARTE 1: ESTRUTURA DE PASTAS E ARQUIVOS DO BACKEND**

1.  **Crie a estrutura de pastas do backend:**
    ```bash
    mkdir -p backend/core
    mkdir -p backend/apps
    mkdir -p backend/api/v1/endpoints
    ```

2.  **Navegue para a pasta `backend` e crie um ambiente virtual Python:**
    ```bash
    cd backend
    python3 -m venv venv
    ```

3.  **Crie os arquivos iniciais do Django na pasta `backend`:**
    *   Crie o arquivo `manage.py`.
    *   Dentro de `backend/core`, crie os arquivos `__init__.py`, `asgi.py`, `settings.py`, `urls.py`, `wsgi.py`, e `celery.py`.

4.  **Crie a estrutura dos `apps` do Django:**
    ```bash
    # Dentro da pasta backend/apps, crie as seguintes subpastas:
    mkdir -p apps/accounts
    mkdir -p apps/properties
    mkdir -p apps/reservations
    mkdir -p apps/finances
    mkdir -p apps/concierge_ai

    # Para cada uma dessas pastas, crie os arquivos: __init__.py, admin.py, models.py, apps.py, tests.py, views.py
    # Exemplo para 'accounts':
    touch apps/accounts/__init__.py apps/accounts/admin.py apps/accounts/models.py apps/accounts/apps.py apps/accounts/tests.py apps/accounts/views.py
    # Repita para os outros 4 apps.
    ```

5.  **Crie a estrutura da API:**
    *   Dentro de `backend/api`, crie `__init__.py` e `main.py`.
    *   Dentro de `backend/api/v1`, crie `__init__.py` e `schemas.py`.
    *   Dentro de `backend/api/v1/endpoints`, crie `__init__.py`, `pousadas.py`, e `reservas.py`.

6.  **Navegue de volta para a raiz do projeto:**
    ```bash
    cd ..
    ```

---

### **PARTE 2: ESTRUTURA DO FRONTEND**

1.  **Use o `npx` para criar o projeto Next.js na pasta `frontend`.** Use as configurações padrão (TypeScript: Sim, ESLint: Sim, Tailwind CSS: Sim, `src/` directory: Não, App Router: Sim).
    ```bash
    npx create-next-app@latest frontend
    ```

---

### **PARTE 3: CRIAÇÃO DOS ARQUIVOS DE CONFIGURAÇÃO E DOCKER**

1.  **Crie o arquivo `docker-compose.yml` na raiz do projeto (`monorepo-pousadas/`) com o seguinte conteúdo:**
    ```yaml
    # (Cole aqui o conteúdo completo do docker-compose.yml que definimos na mensagem anterior)
    version: '3.8'

    services:
      db:
        image: postgres:15-alpine
        volumes:
          - postgres_data:/var/lib/postgresql/data/
        environment:
          - POSTGRES_USER=seu_usuario
          - POSTGRES_PASSWORD=sua_senha_segura
          - POSTGRES_DB=sua_db
        ports:
          - "5432:5432"

      redis:
        image: redis:7-alpine

      backend:
        build: ./backend
        command: uvicorn core.asgi:application --host 0.0.0.0 --port 8000 --reload
        volumes:
          - ./backend:/app
        ports:
          - "8000:8000"
        env_file:
          - ./backend/.env
        depends_on:
          - db
          - redis

      worker:
        build: ./backend
        command: celery -A core worker -l info
        volumes:
          - ./backend:/app
        env_file:
          - ./backend/.env
        depends_on:
          - backend

      frontend:
        build: ./frontend
        command: npm run dev
        volumes:
          - ./frontend:/app
          - /app/node_modules
        ports:
          - "3000:3000"
        depends_on:
          - backend

    volumes:
      postgres_data:
    ```

2.  **Crie o arquivo `backend/Dockerfile` com o seguinte conteúdo:**
    ```dockerfile
    # (Cole aqui o conteúdo completo do Dockerfile do backend)
    FROM python:3.11-slim
    WORKDIR /app
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONUNBUFFERED 1
    RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*
    COPY ./requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . .
    EXPOSE 8000
    ```

3.  **Crie o arquivo `frontend/Dockerfile` com o seguinte conteúdo:**
    ```dockerfile
    # (Cole aqui o conteúdo completo do Dockerfile do frontend)
    FROM node:20-alpine
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    EXPOSE 3000
    ```

4.  **Crie o arquivo `backend/.env` com o seguinte conteúdo. Gere uma nova SECRET_KEY:**
    ```
    SECRET_KEY=django-insecure-mude-esta-chave-para-algo-aleatorio
    DEBUG=True
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha_segura
    POSTGRES_DB=sua_db
    DATABASE_HOST=db
    DATABASE_PORT=5432
    ```

5.  **Crie o arquivo `backend/requirements.txt` com o seguinte conteúdo:**
    ```
    django
    psycopg2-binary
    python-decouple
    fastapi
    uvicorn
    celery
    redis
    thefuzz
    python-Levenshtein
    crewai
    crewai-tools
    openai
    python-dotenv
    ```

---

**Verificação Final:**
Ao final da execução, a estrutura de pastas e arquivos deve corresponder exatamente ao que foi planejado. O próximo passo manual será popular os arquivos `models.py` e `settings.py` e então rodar `docker-compose up --build`.

**FIM DO PROMPT**
