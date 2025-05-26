const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ProduitDAO {
    async create(data) {
        return await prisma.produit.create({ data });
    }

    async findAll() {
        return await prisma.produit.findMany();
    }

    async findById(id) {
        return await prisma.produit.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.produit.update({
            where: { id },
            data,
        });
    }

    async delete(id) {
        return await prisma.produit.delete({ where: { id } });
    }
}

module.exports = new ProduitDAO();