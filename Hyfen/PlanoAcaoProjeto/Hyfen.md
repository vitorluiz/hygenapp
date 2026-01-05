# Hyfen - Gestão de hospedagens

Hy-fen é um software de gestão de hospedagens para SMB.

vendo uma necessidade em minha cidade, compreendi que existe um mercado pronto para ser explorado.
Existem milhores de hospedagens sendo elas (Pousadas, hoteis, resorts, Casas e quartos ) que pagam taxas para as grandes empresas como Airbnb, Brooking, TripAdvisor e outras empresas que fazem gestão de hospedagens como a HSYSTEM. Existem mercados para todos. 

Quero eliminar a burocrácia a gestão deve ser mais fácil, pensando no pequeno hoteleiro e mirandono grande, simplicidade no atendimento. 

Quero oferecer a facilidade de gestão para o dono e comodidade para o hospede que ao contratar a sua hospedagem ele já recebe os seus acessos diretamente o email e/ou Whatsapp. 

Voucher de senha de Wifi, acessos aos controladores de acessos. 

isso garante ao dono vários beneficios com controles de wifi por exemplo se o hospede comete algum crime usando a internet temos rastreabilidade, com acessos permissivos em equipamentos de controles de acesso exemplos fechaduras com leitura de qrcode ou senhas, o dono pode liberar o acesso sem ter que levar a chave se necessário resetar remotamente. 

quero oferecer ao dono da hospedagem para quem não tem site, criar uma landpage e um motor de reservas trazendo o cliente dos grandes player para o seu site e fazendo a reserva no seu motor de reservas. 

trabalhar o marketing para ter um SEO nas buscas das hospedagens

ao realizar o check-out já iniciar a solicitação de recomendação no google para ter um raqueamento melhor no google maps, trabalhar o google meu negocio da hospedagem.

controlar o financeiro da hospedagens emissor de NFE quanod solicitado
cadastrar um dono pessoa fisica com multiplas propriedades e poder gerir-las de uma dashboard. 

cadastrar permissões para funcionários/colaboradores com permissões e mais funções que virão.


# Hyfen - Fase 1

Objetivos de Negócio:
Permitir que um proprietário (pessoa física) se cadastre.
Permitir que este proprietário cadastre suas múltiplas propriedades e acomodações.
Garantir que apenas o dono possa ver e gerenciar suas próprias propriedades.

API Segura:
Criar endpoints para: Registro, Login, Criação/Leitura/Atualização/Deleção (CRUD) de Propriedades e Acomodações.
Diretiva Crítica: Implementar a Autorização por Papel. Toda operação de escrita (Criar, Atualizar, Apagar) em uma propriedade deve verificar se o usuário logado é o OWNER daquela propriedade. Isso é inegociável para a segurança. 
aqui fiquei com duvida nessa questão, Aqui quando fala o dono é quem pode cadastrar novas propriedades? 
supondo que sou dono e tenho 2 hospedagem (seja ela que tipo for não importa aqui ) uma pousada X, tenhos 3 funcionários e quero deixar um funcionário com poder de Gerencia para resolver questões administrativas, posso dar autonomia a ele ou somene eu tenho éssa autorização?

# aJUSTE

Resposta Direta: Sim, você poderá dar autonomia ao seu gerente. Você continuará sendo o único com o poder de "dono" (como vender ou apagar a propriedade do sistema), mas poderá delegar poderes administrativos, como gerenciar acomodações e reservas, ao seu gerente. Projetaremos o sistema para suportar essa hierarquia desde o começo.