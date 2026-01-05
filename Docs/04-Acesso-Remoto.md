# Guia de Acesso Remoto - Hyfen

## Acessando o sistema de outros dispositivos

Por padrão, o sistema está configurado para acesso local (`localhost`). Para acessar de outros dispositivos na mesma rede (celular, outro computador), siga os passos abaixo:

### 1. Descubra o IP do seu computador

No terminal, execute:

```bash
hostname -I | awk '{print $1}'
```

Você verá algo como: `192.168.1.100`

### 2. Configure a variável de ambiente da API

Edite o arquivo `/frontend/.env.local`:

```bash
cd frontend
nano .env.local
```

Substitua `localhost` pelo IP do seu computador:

```env
NEXT_PUBLIC_API_URL=http://192.168.1.100:8000
```

**Importante:** Use o IP que você descobriu no passo 1!

### 3. Rebuild o frontend

Como a variável `NEXT_PUBLIC_API_URL` é embutida no build, você precisa fazer rebuild:

```bash
cd ..
docker compose down frontend
docker compose up -d --build frontend
```

Aguarde o build completar (pode levar alguns minutos).

### 4. Configure o CORS no backend (se necessário)

Se você ainda tiver erro de CORS, adicione o IP ao arquivo `backend/core/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.1.100:3000',  # Adicione seu IP aqui
]
```

E reinicie o backend:

```bash
docker compose restart backend
```

### 5. Acesse de outros dispositivos

Agora você pode acessar de qualquer dispositivo na mesma rede:

- **Frontend:** `http://192.168.1.100:3000`
- **API Docs:** `http://192.168.1.100:8000/api/docs/`
- **Admin:** `http://192.168.1.100:8000/admin/`

### Troubleshooting

#### Erro "Failed to fetch"

- Verifique se o `.env.local` está configurado corretamente
- Certifique-se de que fez o rebuild do frontend
- Verifique se o firewall permite acesso às portas 3000 e 8000

#### Erro de CORS

- Adicione o IP ao `CORS_ALLOWED_ORIGINS` no backend
- Reinicie o backend com `docker compose restart backend`

#### Não consigo acessar de outro dispositivo

- Verifique se os dispositivos estão na mesma rede
- Verifique o firewall do computador:

```bash
# Ubuntu/Debian
sudo ufw allow 3000
sudo ufw allow 8000

# Fedora/CentOS
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --add-port=8000/tcp --permanent
sudo firewall-cmd --reload
```

### Voltando para acesso local

Se quiser voltar para acesso apenas local:

1. Edite `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

2. Rebuild:
```bash
docker compose down frontend
docker compose up -d --build frontend
```

---

**Dica:** Para produção, use um domínio real e HTTPS!
