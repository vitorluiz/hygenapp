PlanoAcaoV4.md
Referência à Versão Anterior: PlanoAcaoV3.md
1. Changelog: Resumo das Decisões Estratégicas (V3 -> V4)
Esta versão foca em acelerar o ciclo de desenvolvimento e definir a arquitetura de rede para a funcionalidade de domínios personalizados.
Nova Diretiva de Ambiente de Desenvolvimento:
Criação de um Script de "Seed": Fica estabelecida a necessidade de um script para popular o banco de dados com dados fictícios.
Justificativa: Acelerar o desenvolvimento do frontend, permitir testes de funcionalidades em um ambiente realista e validar a estrutura multi-tenant sem a necessidade de cadastros manuais.
Nova Diretiva de Arquitetura de Rede (Multi-Tenancy):
Gerenciamento de Domínios Personalizados via Cloudflare: Fica definida a arquitetura para que cada pousada-cliente possa usar seu próprio domínio.
Justificativa: Oferecer uma experiência de "marca branca" (white-label) é essencial para o nosso produto. O cliente se sentirá dono do site, não apenas um usuário de uma plataforma. O Cloudflare oferece as ferramentas ideais para gerenciar isso de forma escalável e segura.
2. Diretivas de Implementação para a Próxima Fase
Tarefa 1: Atualizar o Modelo Pousada
Diretiva: Os desenvolvedores devem adicionar os novos campos ao model Pousada no arquivo apps/properties/models.py para suportar os dados de prospecção e a configuração de domínio.
Campos a Adicionar:
documento (CharField para CPF/CNPJ)
razao_social (CharField)
telefone_contato (CharField)
email_contato (EmailField)
link_google_maps (URLField)
link_rede_social (URLField, opcional)
horario_funcionamento (CharField, opcional)
dominio_personalizado (CharField, unique=True, opcional)
Tarefa 2: Criar o Script de Seed
Diretiva: Os desenvolvedores devem criar um Comando de Gerenciamento Customizado do Django para o "seeding".
Localização: O script deve ser criado em apps/core/management/commands/seed_data.py.
Funcionalidade: O comando python manage.py seed_data deve:
Verificar se já existem dados para não duplicar.
Criar 1 Proprietario (superusuário) para ser o dono de todas as pousadas de teste.
Criar 10 instâncias do modelo Pousada, preenchendo todos os novos campos com dados fictícios e realistas (nomes, endereços, etc., baseados em Chapada dos Guimarães).
Para cada Pousada criada, criar de 2 a 5 instâncias do modelo Quarto com nomes e capacidades diferentes.
Observação: Não é necessário criar Reservas ou Hospedes neste primeiro momento. O foco é na estrutura das propriedades.
Tarefa 3: Implementar a Arquitetura de Domínios com Cloudflare
Diretiva: Esta é uma diretiva de arquitetura de infraestrutura.
Passo 1 (Aplicação): A aplicação Django/FastAPI deve ser capaz de identificar qual pousada está sendo solicitada com base no host (domínio) da requisição HTTP. Um middleware customizado deve ser criado para inspecionar o cabeçalho Host, buscar a Pousada correspondente no banco de dados pelo campo dominio_personalizado e disponibilizar o objeto pousada para o resto da aplicação (por exemplo, em um request.tenant).
Passo 2 (Infraestrutura - Cloudflare): O fluxo para um novo cliente será:
O cliente (dono da pousada) registra seu domínio (ex: pousadavistadaserra.com.br).
No painel de controle do seu registrador de domínio, o cliente aponta os nameservers (NS) do seu domínio para os nameservers do Cloudflare da SUA CONTA.
Você, no seu painel do Cloudflare, adiciona o domínio do cliente.
Dentro das configurações de DNS daquele domínio no Cloudflare, você cria um registro CNAME para www e para a raiz (@) apontando para o seu domínio principal da aplicação (ex: app.seuservico.com).
Vantagens desta abordagem:
Escalabilidade: Você gerencia todos os domínios dos clientes em um único painel (Cloudflare).
Segurança: Você ganha de graça o SSL/TLS (cadeado HTTPS) para todos os domínios dos seus clientes, gerenciado automaticamente pelo Cloudflare.
Performance: Você ganha o CDN e o cache do Cloudflare, tornando os sites dos seus clientes mais rápidos.
3. Roadmap Futuro (Diretivas para o PlanoAcaoV5.md)
Desenvolvimento da API: Com os dados de seed no lugar, a próxima fase será desenvolver os endpoints da API que servirão esses dados para o frontend (ex: GET /api/v1/pousadas/{slug_ou_dominio}).
Frontend Dinâmico: Implementar a lógica no Next.js para renderizar a landing page correta com base no domínio acessado, consumindo os dados da API.
Painel do Proprietário: Iniciar o desenvolvimento da área logada onde o proprietário poderá ver e gerenciar suas próprias informações, quartos e, futuramente, as configurações de domínio.
