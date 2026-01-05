PlanoAcaoV7.md
Referência à Versão Anterior: PlanoAcaoV6.md (Considerado conceitualmente concluído)
1. Changelog: Resumo das Decisões Estratégicas (V6 -> V7)
Com a arquitetura de multi-tenancy (V5) e de gestão de assinaturas (V6) definidas e implementadas no backend, esta versão foca em conectar o sistema ao mundo exterior: monetização via gateway de pagamento e experiência do usuário via frontend dinâmico.
Nova Diretiva de Arquitetura Financeira:
Adoção de um Gateway de Pagamento (Ex: Stripe): Fica estabelecida a necessidade de integrar o sistema a um gateway de pagamento para automatizar a cobrança recorrente das assinaturas.
Justificativa: A automação de pagamentos é o pilar de um SaaS escalável. A integração via API e webhooks elimina a necessidade de cobrança manual, reduz a inadimplência e profissionaliza a operação financeira.
Nova Diretiva de Arquitetura de Frontend:
Implementação da Lógica de Renderização Dinâmica: O frontend Next.js deve ser capaz de identificar o domínio acessado pelo usuário e consumir a API contextual do backend para renderizar a landing page correta.
Justificativa: Esta é a implementação prática da nossa estratégia de multi-tenancy, entregando a experiência de "marca branca" prometida ao cliente.
2. Diretivas de Implementação para a Próxima Fase
Tarefa 1: Implementar a Integração com o Gateway de Pagamento (Backend)
Diretiva: Os desenvolvedores devem escolher e integrar um gateway de pagamento (Stripe é recomendado pela documentação e APIs robustas).
Ações:
Criar Funções de Serviço: No app subscriptions, criar funções para: criar_assinatura_no_gateway, cancelar_assinatura_no_gateway, buscar_status_da_assinatura.
Implementar Webhooks: Criar um endpoint de API seguro (ex: /api/v1/webhooks/stripe/) para receber eventos do gateway. Este endpoint deve ser capaz de processar eventos como invoice.payment_succeeded (para atualizar o modelo Pagamento e o status da Assinatura para "ATIVA") e invoice.payment_failed (para atualizar o status para "INADIMPLENTE").
Armazenar Chaves de API: As chaves do gateway (pública e secreta) devem ser armazenadas de forma segura no arquivo /backend/.env.
Tarefa 2: Implementar o Frontend Dinâmico (Next.js)
Diretiva: Os desenvolvedores do frontend devem implementar a lógica para buscar e exibir os dados da pousada correta.
Ações:
Lógica de Busca de Dados: No Next.js, usar getServerSideProps ou o App Router equivalente para ler o host da requisição no lado do servidor.
Chamada à API Contextual: Fazer uma chamada fetch para o endpoint GET /api/v1/pousada/ (passando o host no cabeçalho da requisição) para obter os dados da pousada correspondente.
Renderização Condicional: Passar os dados da pousada como props para os componentes da página, que devem renderizar dinamicamente o nome, a descrição, as fotos e os quartos da pousada correta.
Tratamento de Erro: Se a API retornar 404 (domínio não encontrado), a aplicação Next.js deve exibir uma página de erro apropriada.
Tarefa 3: Iniciar o Painel do Proprietário (Frontend - Área Logada)
Diretiva: Criar a estrutura básica da área logada do cliente.
Ações:
Criar a Página de Login: Desenvolver uma página de login simples.
Implementar Autenticação: Criar a lógica para enviar as credenciais para um endpoint de API de login no backend (ex: POST /api/v1/auth/token/) e armazenar o token JWT recebido de forma segura no cliente.
Criar uma Página de Dashboard (Placeholder): Desenvolver uma página protegida que só pode ser acessada após o login, exibindo uma mensagem de boas-vindas como "Olá, [Nome do Proprietário]!".
3. Roadmap Futuro (Diretivas para o PlanoAcaoV8.md)
Gestão de Assinaturas pelo Cliente: Desenvolver as telas no Painel do Proprietário onde ele poderá ver sua assinatura atual, seu histórico de pagamentos (faturas) e, se necessário, atualizar seu método de pagamento.
CRUD de Quartos: Implementar as funcionalidades no Painel do Proprietário para que ele possa Criar, Ler, Atualizar e Deletar (CRUD) os seus próprios quartos.
Desenvolvimento da API de Reservas: Criar os endpoints da API para que um visitante possa verificar a disponibilidade e criar uma reserva.
