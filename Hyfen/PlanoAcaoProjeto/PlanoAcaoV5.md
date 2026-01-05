Referência à Versão Anterior: PlanoAcaoV4.md
1. Changelog: Resumo das Decisões Estratégicas (V4 -> V5)
Esta versão formaliza a arquitetura de software para a identificação de tenants (pousadas) com base no domínio da requisição. Esta é uma etapa fundamental para o funcionamento do SaaS multi-tenant.
Nova Diretiva de Arquitetura de Aplicação (Multi-Tenancy):
Adoção de Middleware para Identificação de Tenant: Fica estabelecida a implementação de um middleware customizado no Django.
Justificativa: Esta é a abordagem padrão da indústria para identificar o tenant no início de cada requisição de forma limpa e desacoplada. O middleware inspeciona o cabeçalho Host, consulta o banco de dados pelo dominio_personalizado e injeta o objeto Pousada (tenant) no objeto request para uso em toda a aplicação.
Adoção de API Contextual: Fica definida a criação de endpoints que respondem com base no tenant identificado pelo middleware, em vez de exigir IDs na URL.
Justificativa: Simplifica drasticamente o desenvolvimento do frontend, que não precisa gerenciar IDs. Ele simplesmente faz uma requisição e o backend já sabe a qual pousada se refere, garantindo segurança e prevenindo vazamento de dados entre tenants.
2. Diretivas de Implementação para a Próxima Fase
Tarefa 1: Implementar o Middleware de Domínio
Diretiva: Os desenvolvedores devem criar um novo arquivo backend/core/middleware/tenant_middleware.py.
Lógica a ser Implementada:
O middleware deve ler o request.get_host().
Ele deve tentar encontrar um objeto Pousada cujo campo dominio_personalizado corresponda ao host.
Se encontrar, deve anexar o objeto Pousada ao request (ex: request.tenant = pousada_encontrada).
Se não encontrar, o request.tenant deve ser None.
Configuração: O novo middleware deve ser adicionado à lista MIDDLEWARE no arquivo core/settings.py.
Tarefa 2: Implementar o Endpoint de API Contextual
Diretiva: Os desenvolvedores devem criar uma View para o endpoint GET /api/v1/pousada/.
Lógica a ser Implementada:
A view não receberá um ID na URL.
Ela deve acessar o tenant através de request.tenant.
Se request.tenant existir, a view deve serializar e retornar os dados daquela pousada.
Se request.tenant for None, a view deve retornar um erro 404 Not Found.
Tarefa 3: Atualizar o Script de Seed
Diretiva: O comando de gerenciamento seed_data deve ser atualizado para popular o campo dominio_personalizado de pelo menos 5 das 10 pousadas fictícias com domínios de teste (ex: pousada-a.test, pousada-b.test).
Justificativa: Permitir que os desenvolvedores testem a funcionalidade localmente.
Tarefa 4: Criar Prova de Conceito (Teste)
Diretiva: Os desenvolvedores devem documentar um teste usando curl para validar a implementação, passando um cabeçalho Host customizado e verificando se a resposta da API corresponde ao tenant esperado.
Exemplo de Comando de Teste: curl -H "Host: pousada-a.test" http://localhost:8000/api/v1/pousada/
3. Roadmap Futuro (Diretivas para o PlanoAcaoV6.md )
Arquitetura de Gestão do SaaS: A próxima fase de planejamento (V6) irá detalhar a arquitetura para a sua gestão financeira e de clientes, incluindo a criação do app subscriptions e a definição dos modelos Plano, Assinatura e Pagamento.
Integração com Gateway de Pagamento: Após a definição da arquitetura de gestão, o passo seguinte será a implementação da integração com um gateway de pagamento (ex: Stripe).
Desenvolvimento do Frontend Dinâmico: Iniciar a implementação no Next.js para que a aplicação leia o domínio e consuma o endpoint contextual /api/v1/pousada/.
