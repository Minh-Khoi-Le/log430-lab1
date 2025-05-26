// server/test-prisma.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ajoute un produit
  const p = await prisma.produit.create({
    data: { nom: 'Pomme', stock: 50, prix: 0.99, categorie: 'Fruit' }
  });
  console.log(p);

  // Liste les produits
  const all = await prisma.produit.findMany();
  console.log(all);
}

main().finally(() => prisma.$disconnect());
