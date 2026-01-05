# Fase 2: API REST e Autenticação

Documentação completa da API REST e sistema de autenticação JWT.

---

## Visão Geral

API RESTful implementada com Django REST Framework e autenticação JWT usando SimpleJWT.

### Tecnologias

- **Django REST Framework** 3.15.2 - Framework para API REST
- **SimpleJWT** 5.4.0 - Autenticação JWT
- **drf-spectacular** 0.29.0 - Documentação OpenAPI/Swagger
- **django-cors-headers** 4.9.0 - CORS para frontend

---

## Configuração

### settings.py

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    'accounts.apps.AccountsConfig',
    'properties.apps.PropertiesConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# JWT Settings
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
```

---

## Serializers

### UserSerializer

Serializer básico para dados do usuário.

```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", 
                  "phone", "cpf", "is_owner", "created_at"]
        read_only_fields = ["id", "created_at"]
```

### UserDetailSerializer

Serializer detalhado com roles.

```python
class UserDetailSerializer(serializers.ModelSerializer):
    roles = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", 
                  "phone", "cpf", "is_owner", "is_staff_member", 
                  "roles", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
```

### UserRegistrationSerializer

Serializer para registro de novos usuários.

```python
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, 
                                     validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ["username", "email", "password", "password_confirm",
                  "first_name", "last_name", "phone", "cpf"]
    
    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = User.objects.create_user(**validated_data)
        return user
```

### UserLoginSerializer

Serializer para validação de login.

```python
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
```

---

## Endpoints

### Base URL

```
http://localhost:8000/api/v1/
```

### Autenticação

#### POST /auth/register/

Registrar novo usuário.

**Request:**
```json
{
  "username": "joao",
  "email": "joao@example.com",
  "password": "SenhaForte123!",
  "password_confirm": "SenhaForte123!",
  "first_name": "João",
  "last_name": "Silva",
  "phone": "11999999999",
  "cpf": "12345678900"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid-here",
    "username": "joao",
    "email": "joao@example.com",
    "first_name": "João",
    "last_name": "Silva",
    "phone": "11999999999",
    "cpf": "12345678900",
    "is_owner": true,
    "created_at": "2026-01-04T21:00:00Z"
  },
  "tokens": {
    "refresh": "eyJhbGci...",
    "access": "eyJhbGci..."
  }
}
```

**Permissões:** AllowAny

---

#### POST /auth/login/

Fazer login e obter tokens.

**Request:**
```json
{
  "username": "joao",
  "password": "SenhaForte123!"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-here",
    "username": "joao",
    "email": "joao@example.com",
    ...
  },
  "tokens": {
    "refresh": "eyJhbGci...",
    "access": "eyJhbGci..."
  }
}
```

**Erros:**

- `401 Unauthorized` - Credenciais inválidas
- `403 Forbidden` - Usuário inativo

**Permissões:** AllowAny

---

#### POST /auth/refresh/

Renovar access token usando refresh token.

**Request:**
```json
{
  "refresh": "eyJhbGci..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJhbGci...",
  "refresh": "eyJhbGci..."  // Novo refresh token (rotação habilitada)
}
```

**Permissões:** AllowAny

---

#### GET /auth/me/

Obter perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer eyJhbGci...
```

**Response (200 OK):**
```json
{
  "id": "uuid-here",
  "username": "joao",
  "email": "joao@example.com",
  "first_name": "João",
  "last_name": "Silva",
  "phone": "11999999999",
  "cpf": "12345678900",
  "is_owner": true,
  "is_staff_member": false,
  "roles": [],
  "created_at": "2026-01-04T21:00:00Z",
  "updated_at": "2026-01-04T21:00:00Z"
}
```

**Permissões:** IsAuthenticated

---

#### PATCH /auth/me/

Atualizar perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer eyJhbGci...
```

**Request:**
```json
{
  "first_name": "João Pedro",
  "phone": "11988888888"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-here",
  "username": "joao",
  "email": "joao@example.com",
  "first_name": "João Pedro",
  "phone": "11988888888",
  ...
}
```

**Permissões:** IsAuthenticated

---

## Documentação Automática

### Swagger UI

Acesse a documentação interativa em:

```
http://localhost:8000/api/docs/
```

Recursos:
- Listagem de todos os endpoints
- Schemas de request/response
- Testar endpoints diretamente
- Autenticação JWT integrada

### OpenAPI Schema

Schema JSON disponível em:

```
http://localhost:8000/api/schema/
```

---

## Autenticação JWT

### Fluxo de Autenticação

1. **Registro/Login** → Recebe `access_token` e `refresh_token`
2. **Requisições** → Envia `access_token` no header `Authorization: Bearer <token>`
3. **Token Expira** → Usa `refresh_token` para obter novo `access_token`
4. **Refresh Expira** → Faz login novamente

### Configuração de Tokens

| Token | Tempo de Vida | Uso |
|-------|---------------|-----|
| Access Token | 15 minutos | Autenticação de requisições |
| Refresh Token | 7 dias | Renovação de access token |

### Headers de Autenticação

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Segurança

### Validações Implementadas

1. **Senha Forte** - Validadores do Django
2. **Email Único** - Constraint no banco
3. **Username Único** - Constraint no banco
4. **CPF Único** - Constraint no banco (quando fornecido)
5. **CORS** - Apenas localhost:3000 permitido
6. **HTTPS** - Recomendado em produção

### Boas Práticas

- Tokens JWT armazenados no cliente (localStorage/sessionStorage)
- Refresh token rotation habilitada
- Access tokens de curta duração
- Senha nunca retornada na API
- Validação de senha forte

---

## Testes

### Teste de Registro

```bash
curl -X POST http://localhost:8000/api/v1/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste",
    "email": "teste@example.com",
    "password": "SenhaForte123!",
    "password_confirm": "SenhaForte123!",
    "first_name": "Teste",
    "last_name": "User"
  }'
```

### Teste de Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste",
    "password": "SenhaForte123!"
  }'
```

### Teste de Perfil

```bash
# Primeiro, obtenha o token
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"teste","password":"SenhaForte123!"}' \
  | jq -r '.tokens.access')

# Depois, use o token
curl -X GET http://localhost:8000/api/v1/auth/me/ \
  -H "Authorization: Bearer $TOKEN"
```

---

## Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

**Próximo:** [Fase 3: Configuração do Ambiente](./03-Configuracao-Ambiente.md)
