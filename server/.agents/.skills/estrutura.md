# Guia de Estrutura e Tecnologias

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de APIs escaláveis.
- **Prisma ORM**: Mapeamento objeto-relacional para acesso a banco de dados.
- **Zod**: Validação de dados e schemas, usado como Pipe global ou por rota.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Vitest**: Testes unitários e de integração (substitui o Jest).
- **Supertest**: Testes de integração de rotas HTTP.
- **SQLite** (ou outro banco, conforme ambiente): Banco de dados padrão para desenvolvimento.

## Padrões e Convenções

- Cada módulo em `src/modules` representa um domínio ou feature.
- Cada feature tem seu próprio controller, usecase (service), repository, dto, teste (com Vitest) e schemas.
- Validação sempre com Zod, preferencialmente via Pipe.
- Prisma Client é injetado nos repositórios.
- Testes ficam na pasta `test` dentro do módulo.
- Funções auxiliares, eventos e tipos ficam em suas respectivas pastas.

## Exemplo de Criação de Feature

1. Crie as pastas: `controller`, `usecase`, `repositories`, `dto`, `test`, `utils`, `events`, `types`.
2. Implemente o controller para a rota desejada.
3. Implemente o usecase (service) com a lógica de negócio.
4. Implemente o repository usando Prisma.
5. Crie o DTO e o schema Zod para validação.
6. Implemente testes unitários e de integração usando Vitest.
