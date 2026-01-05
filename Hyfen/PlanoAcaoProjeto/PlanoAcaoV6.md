PlanoAcaoV6.md
Referência à Versão Anterior: PlanoAcaoV5.md
1. Changelog: Resumo das Decisões Estratégicas (V5 -> V6)
Com a arquitetura de identificação de tenant (pousada) estabelecida na V5, esta versão introduz a camada de gestão do SaaS, focando no controle financeiro e de assinaturas do administrador do sistema.
Nova Diretiva de Arquitetura de Gestão (Admin SaaS):
Criação de um Novo App subscriptions: Fica estabelecida a necessidade de um novo app Django chamado subscriptions.
Justificativa: Separar completamente a lógica de negócio do seu SaaS (planos, assinaturas, pagamentos) da lógica de negócio dos seus clientes (reservas, transações da pousada). O app financas existente pertence ao cliente; o app subscriptions pertence a você, o administrador.
Definição de Modelos de Assinatura: O novo app conterá os modelos para gerenciar os planos que você oferece e quais pousadas assinam quais planos.
Integração com Gateway de Pagamento: Fica definido no roadmap que o sistema precisará se integrar a um gateway de pagamento (ex: Stripe, PagSeguro) para automatizar a cobrança recorrente das mensalidades.
Diretiva de Ferramenta de Gestão Inicial:
Uso do Django Admin como Painel de Controle: O Painel de Administração nativo do Django será customizado para servir como o centro de controle inicial para o gestor do SaaS.
Justificativa: O Django Admin é uma ferramenta poderosa, segura e rápida de configurar, permitindo um painel de gestão robusto com esforço de desenvolvimento mínimo.
2. Diretivas de Implementação para a Próxima Fase
Tarefa 1: Criar o Novo App subscriptions
Diretiva: Os desenvolvedores devem criar um novo app Django: python manage.py startapp subscriptions dentro da pasta apps e registrá-lo no settings.py.
Tarefa 2: Implementar os Modelos de Assinatura
Diretiva: Os desenvolvedores devem criar os seguintes modelos no arquivo apps/subscriptions/models.py:
Plano:
Campos: nome (ex: "Essencial", "Add-on IA"), codigo_gateway (para identificar o plano no gateway de pagamento), valor_mensal, descricao.
Assinatura:
Campos: pousada (ForeignKey para properties.Pousada), plano (ForeignKey para Plano), status (Choices: "ATIVA", "INADIMPLENTE", "CANCELADA"), data_inicio, data_fim (opcional), id_assinatura_gateway.
Pagamento:
Campos: assinatura (ForeignKey para Assinatura), valor_pago, data_pagamento, status_gateway, id_transacao_gateway.
Tarefa 3: Customizar o Django Admin como Painel de Controle
Diretiva: Os desenvolvedores devem configurar os arquivos admin.py para transformar o Django Admin no seu painel de controle.
Ações:
Registrar os Novos Modelos: Registrar os modelos Plano, Assinatura e Pagamento no admin.py do app subscriptions.
Melhorar a Visualização: Usar list_display, list_filter e search_fields para criar visualizações úteis (ex: filtrar assinaturas por status ou por plano).
Criar Ações Customizadas (Opcional): Adicionar "admin actions" para tarefas comuns, como "Marcar assinatura como inadimplente".
3. Roadmap Futuro (Diretivas para o PlanoAcaoV7.md)
Integração com Gateway de Pagamento: Detalhar a implementação da integração com o gateway de pagamento escolhido (ex: Stripe), incluindo a criação de webhooks para receber notificações de pagamento.
Desenvolvimento do Frontend Dinâmico: Com a arquitetura de tenant pronta, iniciar a construção da lógica no Next.js para renderizar a pousada correta com base no domínio.
Painel do Proprietário (Área Logada): Iniciar o desenvolvimento das telas onde o cliente poderá gerenciar sua própria assinatura e ver suas faturas.