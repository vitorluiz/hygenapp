PlanoAcaoV10.md
Referência à Versão Anterior: PlanoAcaoV9.md
1. Changelog: Resumo das Decisões Estratégicas (V9 -> V10)
Esta versão oficializa e integra o design system da marca Hyfen, fornecido pela equipe de Marketing, ao nosso processo de desenvolvimento.
Adoção do Guia de Identidade Visual Hyfen: Fica estabelecida a adoção completa do documento "Entrega Técnica – Identidade Visual Hyfen" como a única fonte de verdade para o design de todas as interfaces do produto.
Diretriz Principal: Moderno e Tecnológico (Dark Mode).
Justificativa: Garantir consistência visual, profissionalismo e uma experiência de usuário coesa em toda a plataforma, desde a landing page até os painéis de gestão.
Diretiva de Foco de Desenvolvimento (Frontend): Conforme recomendado pelo documento de identidade visual, o foco de desenvolvimento de frontend se move para a Fase 2: Desenvolvimento da Administração da Propriedade (Painel do Proprietário).
Justificativa: Com a identidade visual definida, podemos agora construir a principal ferramenta que nosso cliente usará, garantindo que ela já nasça com a aparência e usabilidade corretas.
2. Diretivas de Implementação para a Próxima Fase
Tarefa 1: Configurar o Ambiente de Frontend com o Design System
Diretiva: Os desenvolvedores de frontend devem configurar o projeto Next.js para utilizar as especificações do guia de identidade visual.
Ações:
Configurar Tailwind CSS: No arquivo tailwind.config.js, definir a paleta de cores oficial (Background Principal, Cards, Texto, Verde Sucesso) e o gradiente de marca (Roxo/Azul).
Importar a Fonte: Configurar o projeto para usar a fonte "Inter" do Google Fonts como padrão.
Criar Componentes de UI Base: Desenvolver os componentes reutilizáveis básicos seguindo as diretrizes:
Button: Criar variantes para "Botão de Marca" (com gradiente) e "Botão de Sucesso" (verde sólido).
Card: Criar um componente de card com o fundo #1C1C22 e bordas arredondadas de 16px.
Badge: Criar o componente de badge no formato "pill" para status de sucesso.
Tarefa 2: Desenvolver o Dashboard do Cliente (Painel do Proprietário)
Diretiva: Iniciar a construção da área logada do cliente, aplicando rigorosamente o novo design system.
Ações:
Atualizar a Página de Login: Redesenhar a página de login do proprietário para seguir o padrão dark mode, utilizando o gradiente de marca no botão de "Entrar".
Construir o Layout Base do Painel: Criar o layout principal da área logada, incluindo uma barra lateral de navegação (com fundo #0E0E11) e uma área de conteúdo principal.
Desenvolver o Dashboard Principal do Cliente:
Diretiva de API: A equipe de backend deve criar os endpoints necessários para popular este dashboard (ex: GET /api/v1/dashboard/stats/ que retorne o número de reservas no mês, taxa de ocupação, etc., sempre no contexto do request.tenant).
Diretiva de Frontend: A interface deve exibir essas métricas em componentes Card, utilizando a hierarquia de texto definida (Inter 700 para títulos, etc.) e o fundo #1C1C22. O uso do gradiente de marca deve ser mínimo, apenas em pontos de destaque.
3. Roadmap Futuro (Diretivas para o PlanoAcaoV11.md)
CRUD de Quartos: A próxima etapa no desenvolvimento do Painel do Proprietário será a implementação das telas para que ele possa gerenciar (Criar, Ler, Atualizar, Deletar) seus quartos.
API de Reservas: Paralelamente, o backend focará em construir os endpoints para o motor de reservas da landing page.
Integração com Gateway de Pagamento: Reintroduzir a diretiva de integração com o gateway de pagamento, agora que o produto está ganhando forma visual e funcional.
