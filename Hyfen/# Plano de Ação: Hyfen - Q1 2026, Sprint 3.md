# Plano de Ação: Hyfen - Q1 2026, Sprint 3

**Meta do Sprint:** Enriquecer a gestão da propriedade, permitindo a personalização detalhada das acomodações, preços e da identidade visual da Landing Page, além de documentar formalmente a API.

---

## Épico 8: Gestão Detalhada de Acomodações

*O objetivo é permitir que o proprietário defina e gerencie as unidades locáveis dentro de sua propriedade.*

*   **[US-8.1] CRUD de Acomodações**
    *   **Como** um Proprietário, **na** página de detalhes da minha propriedade no dashboard, **eu quero** poder adicionar, visualizar, editar e remover Acomodações (ex: "Quarto Standard", "Suíte Master"), **para que** eu possa gerenciar minhas unidades locáveis.
    *   **Critérios de Aceite:**
        *   A API deve ser estendida para suportar operações CRUD (Create, Read, Update, Delete) para o modelo `Accommodation`, associadas a uma `Property`.
        *   A interface do dashboard deve permitir a execução dessas quatro operações.

*   **[US-8.2] Definição de Atributos da Acomodação**
    *   **Como** um Proprietário, **ao** cadastrar ou editar uma acomodação, **eu quero** poder definir seus atributos chave, como nome, tipo, capacidade de hóspedes e preço base por noite, **para que** a informação da minha acomodação seja completa.
    *   **Critérios de Aceite:**
        *   O formulário de criação/edição de acomodação no frontend deve incluir campos para `name`, `type`, `capacity` e `base_price_per_night`.
        *   Esses dados devem ser corretamente salvos no banco de dados através da API.

*   **[US-8.3] Upload de Mídia (Fotos)**
    *   **Como** um Proprietário, **eu quero** poder fazer o upload de múltiplas fotos para cada acomodação e também para a propriedade como um todo, **para que** eu possa exibir visualmente o meu espaço.
    *   **Critérios de Aceite:**
        *   O backend deve ser configurado para lidar com uploads de arquivos, integrando-se a um serviço de armazenamento (CDN/S3).
        *   Um modelo `Image` deve ser criado, com relação para `Property` ou `Accommodation`.
        *   A interface do dashboard deve incluir um componente de upload de múltiplas imagens.

---

## Épico 9: Personalização da Landing Page

*O objetivo é dar ao proprietário o controle sobre a identidade visual da sua página pública.*

*   **[US-9.1] Upload de Logo da Marca**
    *   **Como** um Proprietário, **no** meu dashboard, **eu quero** ter uma área de "Personalização" onde eu possa fazer o upload do logo da minha marca, **para que** minha Landing Page tenha minha identidade visual.
    *   **Critérios de Aceite:**
        *   O modelo `Property` deve ser estendido com um campo para o logo.
        *   O logo enviado através do dashboard deve ser exibido na Landing Page pública correspondente.

*   **[US-9.2] Definição de Cor Primária**
    *   **Como** um Proprietário, **eu quero** poder definir uma "cor primária" para a minha marca, **para que** os elementos da minha Landing Page (botões, links) sigam meu padrão de cores.
    *   **Critérios de Aceite:**
        *   O modelo `Property` deve ser estendido com um campo `primary_color`.
        *   A cor definida no dashboard deve ser aplicada dinamicamente aos elementos da UI na Landing Page pública, preferencialmente via variáveis CSS.

*   **[US-9.3] Ordenação de Fotos**
    *   **Como** um Proprietário, **eu quero** poder reordenar as fotos da minha propriedade e acomodações, **para que** eu possa escolher a melhor imagem de capa e controlar a narrativa visual.
    *   **Critérios de Aceite:**
        *   O modelo `Image` deve ser estendido com um campo de ordenação (`order`).
        *   A interface do dashboard deve prover um mecanismo para reordenar as imagens (ex: drag-and-drop).
        *   A ordem definida deve ser respeitada na exibição das fotos na Landing Page.

---

## Épico 10: Documentação da API

*O objetivo é garantir que nossa API seja clara e utilizável pela equipe de frontend e futuros parceiros.*

*   **[US-10.1] Geração Automática de Documentação da API**
    *   **Como** um Desenvolvedor, **eu quero** que a nossa API tenha uma documentação interativa (Swagger/OpenAPI) gerada automaticamente, **para que** eu possa entender e testar todos os endpoints disponíveis sem depender de documentação manual.
    *   **Critérios de Aceite:**
        *   A biblioteca `drf-spectacular` (ou similar) deve ser instalada e configurada no projeto Django.
        *   Uma nova URL (ex: `/api/v0/docs/`) deve ser criada para expor a interface do Swagger UI.
        *   Todos os endpoints criados até o momento devem aparecer corretamente na documentação.

---

### Critérios de Sucesso para o Sprint 3

1.  Um proprietário consegue gerenciar completamente suas acomodações (criar, editar, apagar, definir preço e capacidade) através do dashboard.
2.  O proprietário consegue fazer o upload de fotos para a propriedade e acomodações.
3.  O proprietário consegue personalizar a Landing Page com seu logo e cor de marca.
4.  As personalizações (logo, cor, fotos) são refletidas corretamente na Landing Page pública.
5.  Uma página de documentação da API (Swagger) está acessível e funcional.


# Plano de Ação: Hyfen - Q1 2026, Sprint 3 (Revisado)

**Meta do Sprint:** Implementar a fundação do controle de acesso por propriedade e habilitar a gestão detalhada (acomodações, personalização) dentro do contexto de uma propriedade específica.

---
## Épico 12 (NOVO): Governança e Segurança da Plataforma

*   **[US-12.1] Implementação da Trilha de Auditoria**
    *   **Como** um Administrador do Sistema, **eu quero** que todas as ações de criação, atualização e exclusão nos modelos principais (User, Property, Accommodation, Booking) sejam registradas, **para que** eu tenha uma trilha de auditoria completa de quem fez o quê e quando.
    *   **Critérios de Aceite:**
        *   A biblioteca `django-auditlog` é instalada e configurada.
        *   Os modelos `Property`, `Accommodation` e o modelo de `User` são registrados para auditoria.
        *   Ao criar uma nova propriedade através da API, um registro correspondente aparece na seção "Audit Log" do Django Admin.


## Épico 11: Fundação de Controle de Acesso e Gestão por Propriedade

*O objetivo é evoluir de um modelo "dono de tudo" para um modelo onde um usuário tem acesso específico a propriedades, criando a base para a futura gestão de equipes.*

*   **[US-11.1] Modelo de Dados de Acesso**
    *   **Como** um Arquiteto, **eu quero** criar um novo modelo no banco de dados chamado `PropertyAccess`, **para que** possamos registrar a relação entre um `User` e uma `Property` com um papel definido.
    *   **Critérios de Aceite:**
        *   Um novo modelo `PropertyAccess` é criado no Django.
        *   Ele deve conter, no mínimo, os campos: `user` (ForeignKey para User), `property` (ForeignKey para Property), e `role` (CharField com escolhas, ex: 'OWNER', 'MANAGER').
        *   Ao criar uma nova propriedade, um registro `PropertyAccess` deve ser criado automaticamente, designando o criador como 'OWNER'.

*   **[US-11.2] API de Listagem de Propriedades Autorizadas**
    *   **Como** um Usuário logado, **ao** acessar o dashboard, **eu quero** ver uma lista apenas das propriedades às quais eu tenho acesso (seja como dono ou funcionário), **para que** eu só veja informações pertinentes e autorizadas.
    *   **Critérios de Aceite:**
        *   O endpoint `GET /api/v0/properties/` deve ser refatorado.
        *   A lógica de `queryset` no `ViewSet` deve agora filtrar as propriedades com base nos registros `PropertyAccess` associados ao usuário da requisição (`request.user`).

*   **[US-11.3] Dashboard Específico da Propriedade**
    *   **Como** um Usuário, **ao** clicar em uma propriedade na minha lista do dashboard, **eu quero** ser levado a uma página de detalhes específica para aquela propriedade (ex: `/dashboard/properties/[id]`), **para que** eu possa gerenciar as acomodações e personalizações apenas daquele local.
    *   **Critérios de Aceite:**
        *   O frontend (Next.js) deve ter uma nova rota dinâmica para os detalhes da propriedade (ex: `app/dashboard/properties/[propertyId]/page.tsx`).
        *   Esta página será o "hub" principal para as funcionalidades de gestão da propriedade selecionada.

---

## Épico 8: Gestão Detalhada de Acomodações

*Implementado dentro do contexto do novo Dashboard da Propriedade.*

*   **[US-8.1] CRUD de Acomodações por Propriedade**
    *   **Como** um Usuário com permissão, **na** página de detalhes da propriedade, **eu quero** poder adicionar, visualizar, editar e remover Acomodações, **para que** eu possa gerenciar as unidades daquela propriedade específica.
    *   **Critérios de Aceite:**
        *   A API para `Accommodation` deve ser implementada, garantindo que todas as operações sejam validadas contra a permissão do usuário na propriedade pai.
        *   A interface para gerenciar acomodações deve estar localizada dentro da página de detalhes da propriedade.

*   **[US-8.3] Upload de Mídia (Fotos) por Propriedade**
    *   **Como** um Usuário com permissão, **eu quero** poder fazer o upload de múltiplas fotos para a propriedade selecionada e para suas acomodações, **para que** eu possa enriquecer visualmente o conteúdo.
    *   **Critérios de Aceite:**
        *   A funcionalidade de upload de imagens é implementada no dashboard da propriedade.
        *   As imagens são corretamente associadas à propriedade ou acomodação correspondente.

---

## Épico 9: Personalização da Landing Page

*Implementado dentro do contexto do novo Dashboard da Propriedade.*

*   **[US-9.1] Personalização da Identidade Visual**
    *   **Como** um Usuário com permissão, **na** página de detalhes da propriedade, **eu quero** uma seção de "Personalização" para fazer o upload do logo e definir a cor primária da marca, **para que** a Landing Page pública reflita a identidade do meu negócio.
    *   **Critérios de Aceite:**
        *   A interface para upload de logo e seleção de cor está disponível no dashboard da propriedade.
        *   Os dados são salvos e refletidos corretamente na página pública.

---

## Épico 10: Documentação da API

*Garantindo a clareza da nossa arquitetura de API em evolução.*

*   **[US-10.1] Geração Automática de Documentação da API**
    *   **Como** um Desenvolvedor, **eu quero** que a documentação da API (Swagger/OpenAPI) seja atualizada para refletir os novos endpoints e as mudanças na lógica de autorização, **para que** a equipe de frontend possa consumir a API de forma eficiente.
    *   **Critérios de Aceite:**
        *   A biblioteca `drf-spectacular` é instalada e configurada.
        *   A documentação gerada em `/api/v0/docs/` reflete a nova estrutura da API, incluindo os endpoints de acomodações.

---

### Critérios de Sucesso para o Sprint 3 (Revisado)

1.  A estrutura de dados e a API agora suportam o acesso a propriedades baseado em papéis (via `PropertyAccess`).
2.  O dashboard principal lista apenas as propriedades que o usuário logado tem permissão para ver.
3.  Existe uma página de "dashboard de propriedade" onde a gestão de acomodações e personalização é feita de forma isolada para cada propriedade.
4.  Um usuário com permissão consegue adicionar/editar acomodações e personalizar a aparência (logo, cor) da sua propriedade.
5.  A documentação da API (Swagger) está funcional e atualizada.
