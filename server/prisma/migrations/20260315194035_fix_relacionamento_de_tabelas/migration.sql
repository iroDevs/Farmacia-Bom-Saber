-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Endereco_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PerfilFuncionalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "perfilId" INTEGER NOT NULL,
    "funcionalidadeId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "PerfilFuncionalidade_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PerfilFuncionalidade_funcionalidadeId_fkey" FOREIGN KEY ("funcionalidadeId") REFERENCES "Funcionalidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PerfilFuncionalidade" ("atualizadoEm", "criadoEm", "funcionalidadeId", "id", "perfilId", "status") SELECT "atualizadoEm", "criadoEm", "funcionalidadeId", "id", "perfilId", "status" FROM "PerfilFuncionalidade";
DROP TABLE "PerfilFuncionalidade";
ALTER TABLE "new_PerfilFuncionalidade" RENAME TO "PerfilFuncionalidade";
CREATE UNIQUE INDEX "PerfilFuncionalidade_perfilId_funcionalidadeId_key" ON "PerfilFuncionalidade"("perfilId", "funcionalidadeId");
CREATE TABLE "new_UsuarioPerfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "perfilId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "UsuarioPerfil_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsuarioPerfil_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsuarioPerfil" ("atualizadoEm", "criadoEm", "id", "perfilId", "status", "usuarioId") SELECT "atualizadoEm", "criadoEm", "id", "perfilId", "status", "usuarioId" FROM "UsuarioPerfil";
DROP TABLE "UsuarioPerfil";
ALTER TABLE "new_UsuarioPerfil" RENAME TO "UsuarioPerfil";
CREATE UNIQUE INDEX "UsuarioPerfil_usuarioId_perfilId_key" ON "UsuarioPerfil"("usuarioId", "perfilId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_code_key" ON "Endereco"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_usuarioId_cep_logradouro_numero_key" ON "Endereco"("usuarioId", "cep", "logradouro", "numero");
