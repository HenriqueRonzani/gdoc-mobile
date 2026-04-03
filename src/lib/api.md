# Rotas axios da Central de Atendimento (Citizen)

Rotas utilizadas na central de atendimento

## Login

### `POST /auth/login`

Login externo por CPF/CNPJ:

```json
{
  "type": 6,
  "data": {
    "cpf_cnpj": "000.000.000-00",
    "password": "senha"
  }
}
```

Login externo por e-mail:

```json
{
  "type": 6,
  "data": {
    "email": "usuario@dominio.com",
    "password": "senha"
  }
}
```

Login ICP externo:

```json
{
  "type": 2,
  "data": {
    "token": "token_do_certificado"
  }
}
```

### `GET /citizen/contact/uuid`

Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### `GET /auth/me`


```json
{
  "Authorization": "Bearer <access_token>"
}
```

### `GET /permission`

Sem payload.

### `PATCH /citizen/contact/change-password`

Redefinição obrigatória:

```json
{
  "newPassword": "novaSenha"
}
```

Troca no perfil:

```json
{
  "currentPassword": "senhaAtual",
  "newPassword": "novaSenha"
}
```

### `PATCH /contact/first-login`

```json
{
  "hasBeenLogged": true
}
```

## Listagem de solicitações

### `GET /inbox/query/external`

Query params:

```json
{
  "tab": "opened_by_me",
  "search": "texto",
  "page": 1,
  "started_at": "2026-04-02",
  "finished_at": "2026-04-30",
  "document_type": "all"
}
```

### `GET /inbox/query/external-tabs`

Sem payload.

### `GET /document/settings`

Sem payload.

### `PUT /inbox/email/:email_uuid/archive-external`

Sem payload.

### `PUT /inbox/email/:email_uuid/reopen-external`

Sem payload.

## Perfil

### `PUT /user/me`

```json
{
  "name": "Nome da pessoa",
  "cellphone": "(67) 99999-9999",
  "photo_link": "https://.../foto.png",
  "gender": "male",
  "email": "usuario@dominio.com",
  "cpfCnpj": "000.000.000-00",
  "address": {
    "zip": "79000-000",
    "state": "MS",
    "city": "Campo Grande",
    "number": "123",
    "street": "Rua X",
    "neighborhood": "Centro",
    "complement": "Apto 1"
  },
  "address_id": 10,
  "responsibility": "Responsável",
  "secondaryCpfCnpj": "00.000.000/0001-00",
  "textualSignature": "Assinatura textual",
  "dateOfBirth": "1990-01-01",
  "external_notification_settings": {
    "enable_achievement_internal_email": false,
    "enable_forward_internal_email": false,
    "enable_reopen_internal_email": false,
    "enable_reply_internal_email": false,
    "enable_request_signature": false,
    "enable_new_sector_tasks": false
  },
  "profile_remote_file_key": "arquivo-remoto",
  "profile_remote_thumbnail_file_key": "thumb-remota",
  "user_preferences": {
    "default_inbox_sort": "unread"
  }
}
```

### `POST /user/me/password`

```json
{
  "old": "senhaAtual",
  "new": "novaSenha"
}
```

### `POST /person/image`

`multipart/form-data`

Campos:

- `profile`: arquivo

Resposta esperada:

```json
{
  "remote_file_key": "arquivo-remoto",
  "remote_thumbnail_file_key": "thumb-remota",
  "url": "https://.../imagem.png"
}
```

## Visualização da solicitação

### `GET /inbox/email/:uuid/`

`uuid` obrigatório na URL.

Query params:

```json
{
  "inbox_email_uuid": "uuid_obrigatorio_quando_usado",
  "parentEmailUuid": "uuid_obrigatorio_quando_usado",
  "order_by_direction": "asc"
}
```

### `GET /flow/stages/:stageId`

Sem payload.

### `POST /flow/stages/:stageId/action`

```json
{
  "data": {},
  "type": "nome_da_acao"
}
```

### `PUT /inbox/email/:uuid/archive-external`

`uuid` obrigatório na URL.

Sem payload.

### `PUT /inbox/email/:uuid/reopen-external`

`uuid` obrigatório na URL.

Sem payload.