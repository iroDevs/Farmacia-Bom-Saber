# Regras para Modelagem de Banco de Dados (Prisma + SQLite)

## Convenções Gerais

- O banco de dados utilizado é **SQLite** via **Prisma ORM**.
- Todas as alterações de schema devem ser feitas no arquivo `prisma/schema.prisma` e aplicadas via migrations.

## Regras de Nomeclatura

### Modelos (Prisma)

- O nome do modelo deve ser **singular** e com a **primeira letra maiúscula**.
	- Exemplo: `model Usuario`, `model Produto`, `model Cliente`
- Sempre utilize o decorator `@@map` para mapear o modelo para a tabela no banco.

### Tabelas (Banco de Dados)

- O nome da tabela deve ser **plural** e em **letras minúsculas**.
	- Exemplo: `@@map("usuarios")`, `@@map("produtos")`, `@@map("clientes")`

### Colunas

- Use **snake_case** para nomes de colunas.
- Para colunas que representam chaves estrangeiras, use o prefixo `id_` seguido do nome da entidade relacionada.
	- Exemplo: `id_usuario`, `id_produto`, `id_cliente`
- Para nomes compostos, utilize `_` para separar as palavras.
	- Exemplo: `data_criacao`, `email_confirmado`, `primeiro_acesso`

### Chave Primária

- Sempre utilize um campo `id` do tipo `Int` com `@id` e `@default(autoincrement())` como chave primária principal.
	- Exemplo:
		```prisma
		id Int @id @default(autoincrement())
		```

### Chaves Únicas e Relacionamentos

- Use `@unique` para campos que devem ser únicos.
- Para relacionamentos, utilize o padrão Prisma, mas sempre nomeie as colunas de referência com o prefixo `id_`.
	- Exemplo:
		```prisma
		id_usuario Int
		usuario    Usuario @relation(fields: [id_usuario], references: [id])
		```

## Exemplo de Model

```prisma
model Usuario {
	id           Int      @id @default(autoincrement())
	nome         String
	email        String   @unique
	id_perfil    Int
	perfil       Perfil   @relation(fields: [id_perfil], references: [id])
	criado_em    DateTime @default(now())
	atualizado_em DateTime @updatedAt

	@@map("usuarios")
}
```

## Processo para Criar ou Alterar Models

1. Crie ou edite o model no arquivo `prisma/schema.prisma` seguindo as regras acima.
2. Sempre utilize `@@map` para garantir o nome correto da tabela.
3. Rode o comando de migration para aplicar as mudanças:
	 ```bash
	 npx prisma migrate dev --name <descricao_da_mudanca> --schema=prisma/schema.prisma
	 ```
4. Gere o Prisma Client:
	 ```bash
	 npx prisma generate --schema=prisma/schema.prisma
	 ```
5. Atualize os repositórios e serviços conforme necessário.
