-- CreateTable
CREATE TABLE "Responsaveis" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Responsaveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "responsavelPrincipal" INTEGER NOT NULL,

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "responsavelPrincipal" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Locais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "atendidoPor" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResponsaveisEmpresas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResponsaveisLocais" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResponsaveisEmpresas_AB_unique" ON "_ResponsaveisEmpresas"("A", "B");

-- CreateIndex
CREATE INDEX "_ResponsaveisEmpresas_B_index" ON "_ResponsaveisEmpresas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResponsaveisLocais_AB_unique" ON "_ResponsaveisLocais"("A", "B");

-- CreateIndex
CREATE INDEX "_ResponsaveisLocais_B_index" ON "_ResponsaveisLocais"("B");

-- AddForeignKey
ALTER TABLE "Empresas" ADD CONSTRAINT "Empresas_responsavelPrincipal_fkey" FOREIGN KEY ("responsavelPrincipal") REFERENCES "Responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locais" ADD CONSTRAINT "Locais_responsavelPrincipal_fkey" FOREIGN KEY ("responsavelPrincipal") REFERENCES "Responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locais" ADD CONSTRAINT "Locais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_criadoPor_fkey" FOREIGN KEY ("criadoPor") REFERENCES "Responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_atendidoPor_fkey" FOREIGN KEY ("atendidoPor") REFERENCES "Responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResponsaveisEmpresas" ADD CONSTRAINT "_ResponsaveisEmpresas_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResponsaveisEmpresas" ADD CONSTRAINT "_ResponsaveisEmpresas_B_fkey" FOREIGN KEY ("B") REFERENCES "Responsaveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResponsaveisLocais" ADD CONSTRAINT "_ResponsaveisLocais_A_fkey" FOREIGN KEY ("A") REFERENCES "Locais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResponsaveisLocais" ADD CONSTRAINT "_ResponsaveisLocais_B_fkey" FOREIGN KEY ("B") REFERENCES "Responsaveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
