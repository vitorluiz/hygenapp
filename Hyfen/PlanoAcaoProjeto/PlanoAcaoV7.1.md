PlanoAcaoV7.1.md (Revisado)
Referência à Versão Anterior: PlanoAcaoV6.md
1. Changelog: Resumo das Decisões Estratégicas (V6 -> V7.1)
Com a arquitetura de backend definida, esta versão foca em construir a experiência do usuário final e do proprietário da pousada, que é o núcleo de valor do nosso SaaS.
Diretiva de Priorização Estratégica:
Adiamento da Integração com Gateway de Pagamento: A implementação da integração com um gateway de pagamento (ex: Stripe) foi removida do escopo imediato desta fase.
Justificativa: Priorizar a entrega de valor funcional do produto (sites dinâmicos e painel de gestão) antes de introduzir a complexidade da automação de pagamentos. A cobrança dos primeiros clientes pode ser gerenciada manualmente, permitindo validar o produto com menor esforço de engenharia inicial.
Diretiva de Arquitetura de Frontend:
Implementação da Lógica de Renderização Dinâmica: O frontend Next.js deve ser capaz de identificar o domínio acessado e consumir a API contextual do backend para renderizar a landing page correta.
Implementação da Autenticação: Fica estabelecida a necessidade de criar o fluxo de login para o proprietário da pousada, dando acesso a uma área de gestão exclusiva.
2. Diretivas de Implementação para a Próxima Fase (Foco Total em Frontend e API)
Tarefa 1: Implementar o Frontend Dinâmico (Next.js)
Diretiva: Os desenvolvedores do frontend devem implementar a lógica para buscar e exibir os dados da pousada correta com base no domínio.
Ações:
Lógica de Busca de Dados: No Next.js, usar getServerSideProps ou o App Router para ler o host da requisição no lado do servidor.
Chamada à API Contextual: Fazer uma chamada fetch para o endpoint GET /api/v1/pousada/ (passando o host no cabeçalho) para obter os dados da pousada.
Renderização Dinâmica: Passar os dados da pousada como props para os componentes da página, que devem renderizar dinamicamente o nome, a descrição, as fotos e os quartos da pousada correta.
Tratamento de Erro: Se a API retornar 404 (domínio não encontrado), exibir uma página de erro apropriada.
Tarefa 2: Iniciar o Painel do Proprietário (Frontend - Área Logada)
Diretiva: Criar a estrutura básica da área logada do cliente.
Ações:
Criar a Página de Login: Desenvolver uma página de login simples.
Implementar Autenticação: Criar a lógica para enviar as credenciais para um endpoint de API de login no backend (ex: POST /api/v1/auth/token/) e armazenar o token JWT recebido de forma segura no cliente (em um cookie httpOnly, por exemplo ).
Criar uma Página de Dashboard (Placeholder): Desenvolver uma página protegida que só pode ser acessada após o login, exibindo uma mensagem de boas-vindas como "Olá, [Nome do Proprietário]!".
3. Roadmap Futuro (Diretivas para o PlanoAcaoV8.md)
Integração com Gateway de Pagamento: (PRIORIDADE MÁXIMA PARA V8) Detalhar e implementar a integração com o gateway de pagamento escolhido (Stripe, etc.), incluindo a criação de webhooks para automação de cobranças.
Gestão de Assinaturas pelo Cliente: Desenvolver as telas no Painel do Proprietário onde ele poderá ver sua assinatura atual e seu histórico de pagamentos (faturas).
CRUD de Quartos: Implementar as funcionalidades no Painel do Proprietário para que ele possa Criar, Ler, Atualizar e Deletar (CRUD) os seus próprios quartos.
Desenvolvimento da API de Reservas: Criar os endpoints da API para que um visitante possa verificar a disponibilidade e criar uma reserva.
