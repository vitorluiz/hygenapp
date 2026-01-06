# Plano de Ação: Hyfen - Q1 2026, Sprint 1

**Meta do Sprint:** Construir e validar o esqueleto do projeto, o núcleo de dados e o sistema de autenticação. Ao final deste sprint, um usuário deve conseguir se registrar, fazer login e obter um token JWT válido.

---

### **Épico 1: Estruturação do Ambiente de Desenvolvimento**

*   **[US-1.1]** Como desenvolvedor, eu quero um ambiente Docker-Compose funcional com serviços para Backend, Frontend, Banco de Dados e Tarefas, para que eu possa iniciar todo o ambiente com um único comando.
*   **[US-1.2]** Como arquiteto, eu quero que as configurações sensíveis sejam gerenciadas via arquivos `.env` separados por ambiente (raiz, backend, frontend), para garantir a segurança.

---

### **Épico 2: Modelagem e Persistência de Dados**

*   **[US-2.1]** Como arquiteto, eu quero que os modelos de dados para `User`, `Property` e `Accommodation` sejam implementados no Django ORM, utilizando UUIDs como chaves primárias e campos para exclusão lógica.
*   **[US-2.2]** Como arquiteto, eu quero que o sistema de `Role` e `Permission` seja modelado para permitir futuros níveis de acesso.
*   **[US-2.3]** Como desenvolvedor, eu quero gerar e aplicar as migrações do banco de dados para criar o schema no Postgres.

---

### **Épico 3: Autenticação e Administração**

*   **[US-3.1]** Como administrador do sistema, eu quero conseguir criar um superusuário e acessar o painel do Django Admin (`/admin`) para gerenciar os dados brutos do sistema.
*   **[US-3.2]** Como proprietário, eu quero poder me registrar no sistema através de uma API.
    *   **Endpoint:** `POST /api/v0/auth/register`
*   **[US-3.3]** Como usuário registrado, eu quero poder fazer login e receber um token de acesso JWT.
    *   **Endpoint:** `POST /api/v0/auth/login`
*   **Diretiva Técnica:** A API será construída com Django Rest Framework (DRF).

---

### **Épico 4: Conexão Inicial do Frontend**

*   **[US-4.1]** Como desenvolvedor frontend, eu quero criar uma página de login que se comunique com a API de login do backend e armazene o token JWT recebido de forma segura.
*   **[US-4.2]** Como usuário, se eu acessar uma URL que não existe, eu quero ver uma página de erro "404 - Página Não Encontrada" amigável e com a marca do Hyfen, para que eu possa navegar de volta para a página inicial.

---

### **Critérios de Sucesso do Sprint**

1.  O comando `docker-compose up` inicia todos os serviços sem erros.
2.  O painel do Django Admin está acessível e funcional em `http://localhost:8000/admin`.
3.  Testes automatizados para os endpoints de registro e login são implementados e passam com sucesso.
4.  É possível usar a interface de login no frontend (`http://localhost:3000/login` ) para autenticar um usuário com sucesso.

