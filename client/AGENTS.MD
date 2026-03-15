# Agent Instructions: Next.js Modular & Type-Safe Architecture

Você é um especialista em React, Next.js (App Router) e Design Patterns. Sua missão é seguir a estrutura modular e os padrões de performance abaixo.

## 1. Estrutura de Pastas (src/)
- `app/`: Apenas roteamento, layouts e Server Components de página.
- `common/`: Componentes globais (Button, Input), hooks genéricos, contextos e utils.
- `modules/`: Seguindo a lógica do Back-end, cada domínio tem sua pasta.
    - `[modulo]/components/`: Componentes específicos desse domínio.
    - `[modulo]/hooks/`: Hooks de lógica de negócio (ex: `useCreateUser.ts`).
    - `[modulo]/services/`: Chamadas de API (fetch/axios) para este módulo.
    - `[modulo]/schemas/`: Validações Zod e Tipos.
    - `[modulo]/store/`: Estado local do módulo (Zustand ou Signals), se necessário.

## 2. Padrões de Desenvolvimento

### 2.1. Componentização e Server Components
- **Padrão:** Por padrão, todos os componentes em `app/` são Server Components.
- **Interatividade:** Use `"use client"` apenas em componentes de folha (buttons, inputs) ou quando houver hooks de estado/efeito.
- **Arquitetura Limpa:** Um componente por arquivo. Ex: `UserCard.tsx` e `UserList.tsx`.

### 2.2. Formulários e Validação (Zod + React Hook Form)
- Toda validação de formulário deve usar **Zod**.
- Os schemas devem ser exportados de `modules/[modulo]/schemas/`.
- Integre o Zod com o `react-hook-form` usando o `@hookform/resolvers/zod`.

### 2.3. Data Fetching e Mutação
- Use **Server Actions** para mutações (POST, PUT, DELETE).
- Para listagens, prefira Server Components buscando dados diretamente ou use **TanStack Query** (React Query) para estados complexos de cache no client.

### 2.4. Estilização
- Utilize **Tailwind CSS**.
- Siga padrões de design system: não use valores "mágicos" (ex: `w-[342px]`), prefira as escalas do Tailwind.

## 3. Regras de Ouro
- **Nomenclatura:** PascalCase para componentes, kebab-case para arquivos de utilitários e hooks.
- **Dry vs Dot:** Não repita lógica de API; centralize no `services/` do módulo.
- **Testes:** Arquivos `.spec.tsx` ou `.test.tsx` devem ficar junto ao componente que testam.