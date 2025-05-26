-- CreateTable
CREATE TABLE "Produit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "categorie" TEXT,
    "stock" INTEGER NOT NULL,
    "prix" REAL NOT NULL
);
