# Fase 1: Modelagem de Dados

Documentação completa da modelagem de dados do sistema Hyfen.

---

## Visão Geral

O sistema utiliza uma arquitetura baseada em UUID como chave primária e implementa soft delete em todos os modelos principais.

### Princípios de Design

- **UUID como PK:** Todas as entidades usam UUID v4 para evitar exposição de IDs sequenciais
- **Soft Delete:** Exclusão lógica com campo `deleted_at` e flag `is_active`
- **Timestamps:** Todos os modelos têm `created_at` e `updated_at`
- **Relacionamentos:** ForeignKey e ManyToMany bem definidos

---

## App: accounts

Gerenciamento de usuários e controle de acesso.

### Modelo: User

Herda de `AbstractUser` do Django com campos customizados.

**Campos:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUIDField | Chave primária (UUID v4) |
| `username` | CharField | Nome de usuário (herdado) |
| `email` | EmailField | Email único |
| `password` | CharField | Senha hash (herdado) |
| `first_name` | CharField | Primeiro nome |
| `last_name` | CharField | Sobrenome |
| `phone` | CharField | Telefone (opcional) |
| `cpf` | CharField | CPF único (opcional) |
| `is_owner` | BooleanField | É proprietário? (default: True) |
| `is_staff_member` | BooleanField | É membro da equipe? |
| `is_active` | BooleanField | Usuário ativo? (soft delete) |
| `deleted_at` | DateTimeField | Data de exclusão (soft delete) |
| `created_at` | DateTimeField | Data de criação |
| `updated_at` | DateTimeField | Data de atualização |

**Métodos:**

```python
def soft_delete(self):
    """Soft delete do usuário."""
    self.is_active = False
    self.deleted_at = timezone.now()
    self.save()
```

**Configuração:**

```python
AUTH_USER_MODEL = 'accounts.User'
```

---

### Modelo: Role

Sistema de papéis para níveis de acesso.

**Campos:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUIDField | Chave primária |
| `name` | CharField | Nome do papel (único) |
| `description` | TextField | Descrição |
| `is_system_role` | BooleanField | É papel do sistema? |
| `users` | ManyToManyField | Usuários com este papel |
| `created_at` | DateTimeField | Data de criação |
| `updated_at` | DateTimeField | Data de atualização |

**Relacionamentos:**

- `users` → User (M2M)

---

### Modelo: Permission

Permissões granulares para controle de acesso.

**Campos:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUIDField | Chave primária |
| `name` | CharField | Nome da permissão |
| `codename` | CharField | Código único |
| `description` | TextField | Descrição |
| `roles` | ManyToManyField | Papéis com esta permissão |
| `created_at` | DateTimeField | Data de criação |
| `updated_at` | DateTimeField | Data de atualização |

**Relacionamentos:**

- `roles` → Role (M2M)

---

## App: properties

Gerenciamento de propriedades e acomodações.

### Modelo: Property

Representa uma propriedade (pousada, hotel, etc).

**Campos:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUIDField | Chave primária |
| `owner` | ForeignKey | Proprietário (User) |
| `name` | CharField | Nome da propriedade |
| `description` | TextField | Descrição |
| `address` | CharField | Endereço completo |
| `city` | CharField | Cidade |
| `state` | CharField | Estado |
| `zip_code` | CharField | CEP |
| `country` | CharField | País (default: Brasil) |
| `phone` | CharField | Telefone |
| `email` | EmailField | Email |
| `website` | URLField | Website |
| `is_active` | BooleanField | Ativo? |
| `deleted_at` | DateTimeField | Data de exclusão |
| `created_at` | DateTimeField | Data de criação |
| `updated_at` | DateTimeField | Data de atualização |

**Relacionamentos:**

- `owner` → User (FK, CASCADE)
- `accommodations` → Accommodation (reverse FK)

**Métodos:**

```python
def soft_delete(self):
    """Soft delete da propriedade e todas suas acomodações."""
    self.is_active = False
    self.deleted_at = timezone.now()
    self.save()
    self.accommodations.update(is_active=False, deleted_at=timezone.now())
```

---

### Modelo: Accommodation

Representa uma unidade dentro de uma propriedade.

**Campos:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUIDField | Chave primária |
| `property` | ForeignKey | Propriedade |
| `name` | CharField | Nome da acomodação |
| `description` | TextField | Descrição |
| `accommodation_type` | CharField | Tipo (choices) |
| `max_guests` | PositiveIntegerField | Máximo de hóspedes |
| `beds` | PositiveIntegerField | Número de camas |
| `bathrooms` | PositiveIntegerField | Número de banheiros |
| `base_price` | DecimalField | Preço base (por noite) |
| `cleaning_fee` | DecimalField | Taxa de limpeza |
| `is_active` | BooleanField | Ativo? |
| `deleted_at` | DateTimeField | Data de exclusão |
| `created_at` | DateTimeField | Data de criação |
| `updated_at` | DateTimeField | Data de atualização |

**Tipos de Acomodação:**

- `room` - Quarto
- `suite` - Suíte
- `apartment` - Apartamento
- `house` - Casa
- `cabin` - Chalé
- `other` - Outro

**Relacionamentos:**

- `property` → Property (FK, CASCADE)

---

## Diagrama de Relacionamentos

```
User (accounts)
  ├─ 1:N → Property (properties)
  │         └─ 1:N → Accommodation (properties)
  ├─ M:N → Role (accounts)
  │         └─ M:N → Permission (accounts)
  └─ Herda de AbstractUser (Django)
```

---

## Migrações

### Comandos Executados

```bash
# Criar migrações
docker compose exec backend python manage.py makemigrations

# Aplicar migrações
docker compose exec backend python manage.py migrate
```

### Migrações Criadas

- `accounts/migrations/0001_initial.py` - User, Role, Permission
- `properties/migrations/0001_initial.py` - Property, Accommodation

---

## Admin Django

Todos os modelos foram registrados no Django Admin com configurações customizadas:

### UserAdmin
- Listagem: username, email, nome, is_owner, is_staff, is_active, created_at
- Filtros: is_owner, is_staff_member, is_staff, is_superuser, is_active, created_at
- Busca: username, email, nome, cpf, phone
- Fieldsets organizados por categoria

### PropertyAdmin
- Inline de Accommodations
- Filtros por estado, país, status
- Busca por nome, cidade, proprietário

### AccommodationAdmin
- Filtros por tipo, status
- Busca por nome, propriedade

---

## Boas Práticas Implementadas

1. **UUID como PK** - Segurança e escalabilidade
2. **Soft Delete** - Auditoria e recuperação de dados
3. **Timestamps** - Rastreabilidade
4. **Verbose Names** - Interface em português
5. **Meta Classes** - Ordenação e nomes no plural
6. **__str__ Methods** - Representação legível
7. **Related Names** - Queries reversas claras

---

**Próximo:** [Fase 2: API REST e Autenticação](./02-API-REST.md)
