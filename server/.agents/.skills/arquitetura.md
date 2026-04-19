```markdown
# Arquitetura do Projeto — Clean Architecture (NestJS + Prisma)

## 1. Estrutura de Camadas (Dependencies Rule)
O projeto segue a regra de dependência: **a dependência aponta sempre para o centro**.
- **Domain:** O núcleo (Entities, Value Objects, Interfaces). Não conhece ninguém.
- **Application:** Orquestração (UseCases). Conhece apenas o Domain.
- **Infrastructure:** Detalhes (Prisma, NestJS, HTTP). Conhece Domain e Application.

## 2. Estrutura de Pastas
```text
src/
 └── modules/
   └── usuario/                      # Módulo de usuário (exemplo)
     ├── domain/                  # Regras de negócio puras (Entities, Value Objects, Interfaces)
     │    ├── entity/user.entity.ts
     │    └── repository/user.repository.interface.ts
     ├── application/             # Orquestração de negócio (UseCases)
     │    └── create-user.usecase.ts
     └── infrastructure/          # Implementação de detalhes (DB, Controllers, External)
       ├── database/
       │    └── prisma/
       │         └── repository/prisma-user.repository.ts
       └── http/
         ├── create-user.controller.ts
         └── create-user.dto.ts
```

## 3. Regras de Ouro
1. **DIP (Dependency Inversion Principle):** O `UseCase` consome uma **Interface** definida no `Domain`, nunca uma classe concreta da `Infrastructure`.
2. **Framework Agnostic:** O `Domain` e `Application` não podem importar nada do `@nestjs/*`.
3. **Injeção de Dependência:** A ligação entre a interface (Domain) e a implementação (Infrastructure) é feita no arquivo `module.ts` via Custom Providers.
4. **Isolamento de Camadas:** Camadas superiores nunca devem acessar detalhes técnicos de camadas inferiores (ex: o controller não deve acessar o Prisma, apenas o UseCase).

## 4. Exemplo de Implementação (Port & Adapter)

### Domain (Contrato)
```typescript
// domain/user/repository/user.repository.interface.ts
export interface UserRepositoryInterface {
  save(user: User): Promise<void>;
}
```

### Application (Use Case)
```typescript
// application/user/create-user.usecase.ts
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(data: UserData) {
    const user = new User(data);
    await this.userRepository.save(user);
  }
}
```

### Infrastructure (Implementação)
```typescript
// infrastructure/database/prisma/repository/prisma-user.repository.ts
@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({ data: user.toPersistence() });
  }
}
```

## 5. Configuração no Módulo (NestJS)
```typescript
@Module({
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
  ],
})
export class UserModule {}
```
```