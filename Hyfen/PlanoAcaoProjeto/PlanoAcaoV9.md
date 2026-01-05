PlanoAcaoV9.md
Referência à Versão Anterior: PlanoAcaoV8.md
1. Changelog: Resumo das Decisões Estratégicas (V8 -> V9)
Esta versão representa um marco estratégico fundamental: a definição e oficialização da identidade de marca do produto.
Nova Diretiva de Branding e Identidade:
Oficialização do Nome da Marca: O produto SaaS será comercializado sob o nome Hyfen.
Justificativa: O nome Hyfen foi escolhido por seu conceito forte (o software como o "conector" da gestão hoteleira), sua sonoridade moderna e a disponibilidade de ativos digitais estratégicos (hyfen.com.br e @hyfen.app).
Adoção da Identidade Visual: Todas as interfaces e materiais de comunicação devem agora ser desenvolvidos sob a bandeira da marca Hyfen.
2. Diretivas de Implementação para a Próxima Fase
Tarefa 1: Aplicar a Marca Hyfen no Frontend (Branding Inicial)
Diretiva: Os desenvolvedores de frontend devem substituir todas as menções genéricas ("SaaS Pousada", etc.) pelo nome oficial Hyfen nas interfaces já planejadas na Fase 1 do Frontend (Plano V8).
Ações:
Página Comercial: Atualizar o texto da página de marketing para refletir a nova marca e seu conceito. O título principal, por exemplo, pode ser "Hyfen: Conectando você ao sucesso da sua hospedagem."
Dashboard de Administração: O título do painel e todos os elementos de interface devem ser atualizados para Hyfen Admin Dashboard.
Favicon e Título da Página: Criar um favicon temporário (pode ser um simples "H") e garantir que o <title> de todas as páginas seja "Hyfen | [Nome da Página]".
Tarefa 2: Definir a Identidade Visual (Diretiva de Design)
Diretiva: É necessário definir a paleta de cores e o estilo do logotipo para a marca Hyfen.
Ações para Discussão (Chefe e Arquiteto):
Paleta de Cores: Que sentimento queremos transmitir?
Opção A (Corporativo e Confiável): Tons de azul escuro, cinza e um branco limpo.
Opção B (Moderno e Tecnológico): Um gradiente (ex: roxo para azul), preto e detalhes em uma cor vibrante (verde ou laranja).
Opção C (Premium e Sofisticado): Preto, dourado ou prateado e branco.
Logotipo: O logo deve representar o conceito do "hífen/conector"? Pode ser o nome "Hyfen" com um design tipográfico único ou um símbolo abstrato.
Resultado: A decisão sobre cores e logo guiará todo o design do CSS e dos componentes visuais.
Tarefa 3: Planejar o Conteúdo Inicial para o Instagram (@hyfen.app)
Diretiva: A equipe de marketing (ou o responsável) deve planejar os primeiros 9 posts para o Instagram, criando uma "grade de largada" coesa.
Sugestão de Conteúdo:
Post 1 (Central): O logo da Hyfen com o slogan.
Posts 2, 3, 4: Focados nas "dores" do público (Ex: "Cansado de altas comissões?", "Perdendo tempo com tarefas repetitivas?").
Posts 5, 6, 7: Apresentando as "soluções" (Ex: "Sua landing page com reservas diretas.", "Automação que te devolve tempo.").
Posts 8, 9: Apresentando o conceito da marca ("O que é Hyfen?") e um CTA para "Saiba Mais" (link na bio para a futura página comercial).
3. Roadmap Futuro (Diretivas para o PlanoAcaoV10.md)
Desenvolvimento do Painel do Proprietário (Cliente): Com a marca definida, a próxima grande fase de desenvolvimento será a construção da área logada do cliente, já com a identidade visual da Hyfen.
CRUD de Quartos: Implementar as APIs e as interfaces no painel do cliente para que ele possa gerenciar seus quartos.
Integração com Gateway de Pagamento: Reintroduzir a diretiva de integração com o gateway de pagamento, agora que o produto tem uma identidade comercial clara.
