PlanoAcaoV8.md
Referência à Versão Anterior: PlanoAcaoV7.1.md
1. Changelog: Resumo das Decisões Estratégicas (V7.1 -> V8)
Com a maior parte da arquitetura de backend definida, esta versão direciona o foco de implementação para o Frontend (Next.js), estabelecendo um roadmap de desenvolvimento em três fases claras para a construção das interfaces do sistema.
Nova Diretiva de Roadmap de Frontend:
Fase 1: Desenvolvimento da Administração do SaaS (Sua Interface): A prioridade máxima é construir as interfaces para o gestor do sistema.
Justificativa: Antes de podermos oferecer o serviço, precisamos de uma ferramenta para vendê-lo (página comercial) e para administrá-lo (painel de gestão de clientes e financeiro).
Fase 2: Desenvolvimento da Administração da Propriedade (Interface do Cliente): Após a conclusão da Fase 1, o foco se moverá para a área logada do proprietário da pousada.
Justificativa: Construir a ferramenta que nosso cliente usará no dia a dia para gerenciar sua operação. Este é o "core" do produto que estamos vendendo.
Fase 3: Desenvolvimento da Landing Page de Vendas (Interface do Hóspede): Por último, o foco será a landing page pública e dinâmica que receberá as reservas.
Justificativa: Com as ferramentas de gestão prontas, a etapa final é construir a "vitrine" que interage com o público e gera as reservas.
2. Diretivas de Implementação para a Próxima Fase (Foco na Fase 1 do Frontend)
Tarefa 1: Desenvolver a Página Comercial do SaaS
Diretiva: Os desenvolvedores de frontend devem criar uma página de marketing estática para apresentar e vender o nosso produto SaaS.
Conteúdo a ser incluído:
Seção de Herói (Hero Section): Título impactante (ex: "Sua Pousada com Reservas Diretas e Gestão Inteligente"), subtítulo explicando a dor (ex: "Diga adeus às comissões abusivas"), e um botão de "Call to Action" (CTA) (ex: "Quero uma Demonstração" ou "Conheça os Planos").
Seção de Funcionalidades: Apresentar os principais benefícios (Landing Page própria, Sistema de Gestão, Automação de Avaliações, etc.) com ícones e textos curtos.
Seção de Preços: Detalhar os pacotes (Essencial, Completo, Premium) e o add-on de IA.
Seção de Contato: Um formulário simples para que potenciais clientes possam entrar em contato.
Tarefa 2: Desenvolver o Dashboard de Administração do SaaS (Sua Área Logada)
Diretiva: Criar a área logada para você, o gestor do sistema. Inicialmente, esta área pode ter acesso restrito (ex: login direto com suas credenciais de superusuário).
Ações:
Página de Login do Admin: Uma página de login exclusiva para o administrador do SaaS.
Dashboard Principal: Uma página inicial que exibirá métricas chave do negócio.
Diretiva de API: A equipe de backend deve criar novos endpoints de API (ex: GET /api/v1/admin/stats/) que retornem dados agregados, como:
Número total de clientes (pousadas).
Número de assinaturas ativas por plano.
Receita Mensal Recorrente (MRR - Monthly Recurring Revenue).
Diretiva de Frontend: O frontend deve consumir esses endpoints e exibir os dados em "cards" ou gráficos simples.
Página de Gestão de Clientes: Uma tabela que lista todas as Pousadas cadastradas no sistema.
Diretiva de API: O backend deve fornecer um endpoint (GET /api/v1/admin/pousadas/) que retorne a lista de todas as pousadas com seus respectivos planos e status de assinatura.
Diretiva de Frontend: A interface deve permitir visualizar os clientes e, futuramente, clicar para ver detalhes ou gerenciar a assinatura de cada um.
3. Roadmap Futuro (Diretivas para o PlanoAcaoV9.md)
Início da Fase 2 do Frontend: Detalhar as diretivas para a construção do Painel do Proprietário, começando pela tela de login e o dashboard principal dele.
CRUD de Quartos: Implementar as APIs e as interfaces no Painel do Proprietário para que ele possa gerenciar seus próprios quartos.
Integração com Gateway de Pagamento: Com o painel de gestão pronto, a próxima grande etapa de backend será a implementação da automação de pagamentos.
