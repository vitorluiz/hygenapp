# Backlog - Próximo Sprint

## User Story para Sprint 2

### [US-5.1] Site de Documentação com MkDocs

**Como** desenvolvedor,  
**Eu quero** um site de documentação para o projeto,  
**Para que** eu possa encontrar informações de arquitetura e guias de setup de forma centralizada e fácil.

**Prioridade:** Alta  
**Estimativa:** 3 pontos

#### Tarefas

- [ ] Criar o diretório `/docs` na raiz do projeto
- [ ] Instalar o mkdocs e o mkdocs-material (via pip)
- [ ] Configurar o arquivo `mkdocs.yml` inicial
- [ ] Mover os documentos de arquitetura que já criamos (em formato .md) de `/Docs` para `/docs`
- [ ] Adicionar um comando ao `docker-compose.yml` ou um script para servir a documentação localmente (ex: `mkdocs serve`)
- [ ] Configurar navegação e estrutura do site
- [ ] Adicionar busca e índice
- [ ] Testar build e deploy da documentação

#### Critérios de Aceitação

- [ ] Documentação acessível em `http://localhost:8001`
- [ ] Todos os documentos existentes migrados e funcionando
- [ ] Busca funcionando corretamente
- [ ] Navegação intuitiva
- [ ] README atualizado com instruções de acesso

#### Notas Técnicas

**Configuração Sugerida:**

```yaml
# mkdocs.yml
site_name: Hyfen - Documentação
theme:
  name: material
  palette:
    scheme: slate
    primary: indigo
    accent: pink
  features:
    - navigation.tabs
    - navigation.sections
    - toc.integrate
    - search.suggest

nav:
  - Home: index.md
  - Arquitetura:
      - Visão Geral: arquitetura/README.md
      - Modelagem de Dados: arquitetura/modelagem.md
      - API REST: arquitetura/api.md
      - Configuração: arquitetura/configuracao.md
  - Guias:
      - Setup: guias/setup.md
      - Deploy: guias/deploy.md
```

**Docker Compose:**

```yaml
docs:
  image: squidfunk/mkdocs-material
  volumes:
    - ./docs:/docs
  ports:
    - "8001:8000"
  command: serve --dev-addr=0.0.0.0:8000
```

---

## Outras User Stories Planejadas

### [US-4.1] Design System Hyfen
- Configurar cores (dark mode, gradientes)
- Configurar tipografia (Google Fonts)
- Criar componentes base

### [US-4.2] Página de Login
- Formulário de login
- Integração com API
- Armazenamento seguro de token
- Redirecionamento após login

### [US-4.3] Página de Registro
- Formulário de registro
- Integração com API

### [US-4.4] Layout Base do Painel
- Sidebar com navegação
- Header com informações do usuário
- Área de conteúdo

### [US-4.5] Dashboard Inicial
- Placeholder para métricas

---

**Criado em:** 04/01/2026  
**Sprint:** 2 (Planejado)
