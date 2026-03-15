-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "emailConfirmado" BOOLEAN NOT NULL DEFAULT false,
    "primeiroAcesso" BOOLEAN NOT NULL DEFAULT true,
    "senhaTemporaria" BOOLEAN NOT NULL DEFAULT false,
    "permitirAcessoComSenhaTemporaria" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Funcionalidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "funcionalidade" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PerfilFuncionalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "perfilId" INTEGER NOT NULL,
    "funcionalidadeId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioPerfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "perfilId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_code_key" ON "Usuario"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_code_key" ON "Perfil"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionalidades_code_key" ON "Funcionalidades"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionalidades_funcionalidade_key" ON "Funcionalidades"("funcionalidade");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilFuncionalidade_perfilId_funcionalidadeId_key" ON "PerfilFuncionalidade"("perfilId", "funcionalidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioPerfil_usuarioId_perfilId_key" ON "UsuarioPerfil"("usuarioId", "perfilId");
