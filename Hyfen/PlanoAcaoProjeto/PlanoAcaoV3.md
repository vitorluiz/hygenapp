PlanoAcaoV3.md
Referência à Versão Anterior: PlanoAcaoV2.md
1. Changelog: Resumo das Decisões Estratégicas (V2 -> V3)
Esta versão refina a arquitetura de configuração do ambiente, introduzindo uma estratégia de múltiplos arquivos .env para melhorar a segurança e a organização.
Nova Diretiva de Arquitetura de Configuração:
Adotada a Estratégia de Múltiplos Arquivos .env: Em vez de um único .env no backend, o projeto agora utilizará três arquivos .env distintos, cada um com uma responsabilidade clara.
/.env (Raiz do Projeto):
Propósito: Conter exclusivamente as variáveis de ambiente para o docker-compose.yml, principalmente as configurações do banco de dados PostgreSQL (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB).
Justificativa: Isola as configurações de infraestrutura das configurações da aplicação. O Docker Compose lê este arquivo para provisionar os serviços.
/backend/.env:
Propósito: Conter as variáveis de ambiente específicas da aplicação Django/FastAPI, como a SECRET_KEY, DEBUG, DATABASE_HOST (que apontará para o serviço db do Docker), e as chaves de API (OPENAI_API_KEY, etc.).
Justificativa: Garante que o contêiner do backend só tenha acesso às configurações que ele precisa para rodar, sem conhecer os segredos de provisionamento da infraestrutura.
/frontend/.env.local:
Propósito: Conter as variáveis de ambiente específicas da aplicação Next.js, como a URL da API do backend (NEXT_PUBLIC_API_URL).
Justificativa: Segue o padrão do Next.js para gerenciamento de variáveis de ambiente, separando a configuração do frontend da do backend.
2. Diretivas de Implementação para a Próxima Fase
Esta seção detalha as tarefas a serem executadas pelos desenvolvedores para dar vida à aplicação, preenchendo o esqueleto criado na V2.
Tarefa 1: Implementar a Estratégia de Múltiplos .env
Criar os três arquivos .env (/, /backend/, /frontend/) conforme a diretiva acima.
Ajustar o docker-compose.yml para que o serviço db leia o .env da raiz, enquanto o serviço backend continue lendo o /backend/.env.
Tarefa 2: Implementar a Modelagem de Dados (Banco de Dados)
Diretiva: Os desenvolvedores devem preencher os arquivos models.py de cada app Django (accounts, properties, reservations, finances) com o código-fonte dos modelos que já foram previamente esboçados e validados pelo Arquiteto.
Foco Principal: Garantir a correta implementação da ForeignKey no modelo Hospede para a Pousada, assegurando o isolamento de dados (multi-tenancy) que é crucial para o nosso SaaS.
Tarefa 3: Configurar o Projeto Django (core/settings.py)
Diretiva: Os desenvolvedores devem configurar o arquivo settings.py para:
Registrar todos os apps criados (accounts, properties, etc.) na lista INSTALLED_APPS.
Definir o AUTH_USER_MODEL para apontar para o modelo accounts.Proprietario.
Configurar a conexão DATABASES para ler as variáveis do /backend/.env usando python-decouple.
Adicionar as configurações básicas para o Celery, definindo o CELERY_BROKER_URL para apontar para o serviço redis do Docker.
Tarefa 4: Criar as Migrações Iniciais
Após a implementação dos modelos e da configuração, os desenvolvedores devem rodar os comandos makemigrations e migrate (via docker-compose exec) para criar o schema do banco de dados no PostgreSQL.
3. Roadmap Futuro (Diretivas para o PlanoAcaoV4.md)
Criação de Superusuário e Teste do Admin: A próxima fase focará em criar um superusuário e configurar os arquivos admin.py para registrar os modelos no painel de administração do Django, permitindo a inserção dos primeiros dados de teste.
Desenvolvimento dos Endpoints da API (FastAPI): Detalhar e implementar os primeiros endpoints da API v1, começando com a listagem de pousadas e a verificação de disponibilidade de quartos.
Desenvolvimento do Frontend (Next.js): Iniciar a construção dos componentes React para a landing page, conectando-os aos endpoints da API.
