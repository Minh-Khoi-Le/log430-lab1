// server/seedMagasin.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const magasin = await prisma.magasin.upsert({
    where: { id: 1 },
    update: {},
    create: { nom: "Magasin principal" }
  });
  console.log("Magasin seedé:", magasin);
  process.exit();
}
main();
