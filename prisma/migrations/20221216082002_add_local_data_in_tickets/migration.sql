/*
  Warnings:

  - You are about to drop the column `endereco` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `localEmpresa` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localEndereco` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localNome` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localResponsavelPrincipal` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "endereco",
ADD COLUMN     "localEmpresa" INTEGER NOT NULL,
ADD COLUMN     "localEndereco" TEXT NOT NULL,
ADD COLUMN     "localNome" TEXT NOT NULL,
ADD COLUMN     "localResponsavelPrincipal" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_localResponsavelPrincipal_fkey" FOREIGN KEY ("localResponsavelPrincipal") REFERENCES "Responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_localEmpresa_fkey" FOREIGN KEY ("localEmpresa") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
