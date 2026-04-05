# Arquitetura do Projeto — NestJS + Prisma

## Visão Geral

O projeto segue uma arquitetura modular, escalável e orientada a domínio, utilizando **NestJS** como framework principal e **Prisma ORM** para acesso a dados. Cada módulo representa um domínio ou feature do sistema, isolando responsabilidades e facilitando manutenção e testes.

## Estrutura de Pastas

```
src/
  modules/
    [modulo]/
      controller/
        [feature].controller.ts
      usecase/
        [feature].service.ts
      repositories/
        [feature].repository.ts
      dto/
        [feature].dto.ts
      test/
        [feature].spec.ts
      utils/
        [funcoes auxiliares].ts
      events/
        [eventos].ts
      types/
        [tipos].ts
```

### Exemplo: Módulo de Usuário (Feature: Criar Usuário)

```
src/
  modules/
    usuario/
      controller/
        createUser.controller.ts
      usecase/
        createUser.service.ts
      repositories/
        createUser.repository.ts
      dto/
        createUser.dto.ts
      test/
        createUser.spec.ts
```

- **controller/**: Recebe as requisições HTTP, chama o usecase correspondente e retorna a resposta.
- **usecase/**: Implementa a lógica de negócio da feature (ex: criação de usuário).
- **repositories/**: Responsável pelo acesso ao banco de dados via Prisma.
- **dto/**: Define os Data Transfer Objects (ex: dados de entrada/saída).
- **test/**: Testes unitários e de integração da feature.
- **utils/**: Funções auxiliares específicas do módulo.
- **events/**: Eventos de domínio (opcional).
- **types/**: Tipos TypeScript e schemas Zod para validação.

## Validação

- Toda validação de entrada é feita com **Zod**.
- O schema Zod é usado como um **Pipe** no controller, garantindo que apenas dados válidos cheguem ao usecase.

## Padrão de Rotas

Cada ação/feature é exposta como uma rota RESTful, com controller, service (usecase) e repository próprios.
