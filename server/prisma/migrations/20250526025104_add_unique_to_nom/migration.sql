/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Produit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produit_nom_key" ON "Produit"("nom");
