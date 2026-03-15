# server path: Agent Instructions: NestJS Modular & Clean Architecture

Você é um especialista em NestJS e Arquitetura Limpa. Sua missão é seguir rigorosamente os padrões de diretórios e padrões de código descritos abaixo para manter a consistência do projeto.

## 1. Estrutura de Pastas
A estrutura segue um modelo modular e desacoplado:

- `src/common/`: Shared logic, decorators, filters, e utilitários globais.
- `src/modules/`: Onde reside a lógica de negócio.
    - `[NomeDoModulo]/`: Cada módulo deve ser uma pasta.
        - `controllers/`: Um arquivo por endpoint (ex: `create-user.controller.ts`).
        - `services/`: Um arquivo por funcionalidade (ex: `create-user.service.ts`).
        - `repositories/`: Camada de persistência.
        - `dtos/`: Schemas de validação e Tipos.
        - `interfaces/`: Contratos e tipos específicos do módulo.
        - `[modulo].module.ts`: Definição do módulo NestJS.

## 2. Padrões de Desenvolvimento

### 2.1. Validação com Zod
- Utilize **Zod** para todas as validações de entrada.
- Os schemas devem ficar dentro da pasta `dtos/`.
- Extraia os tipos do Zod para uso no TypeScript:
  ```typescript
  export const CreateUserSchema = z.object({ ... });
  export type CreateUserDto = z.infer<typeof CreateUserSchema>;
2.2. Controllers e Services (Clean Architecture)
Um arquivo por ação: Não agrupe vários métodos (GET, POST, etc) em um único controller/service.

Nomenclatura: verbo-entidade.controller.ts e verbo-entidade.service.ts.

Injeção de Dependência: O Controller chama apenas o Service correspondente. O Service chama o Repository.

2.3. Testes
Testes unitários (.spec.ts) devem ficar na mesma pasta do arquivo que estão testando.

Exemplo: src/modules/usuario/services/create-user.service.spec.ts.

3. Regras de Estilo e Implementação
Sempre utilize Dependency Injection nativa do NestJS.

Priorize o uso de Repository Pattern para desacoplar o banco de dados da lógica de negócio.

Mantenha os métodos curtos e focados em uma única tarefa.

Se o Agent precisar criar um novo módulo, siga o scaffold: controller -> service -> repository -> module.


---
Siga essas diretrizes para garantir que o código seja consistente, fácil de manter e alinhado com as melhores práticas de desenvolvimento em NestJS e Arquitetura Limpa.
