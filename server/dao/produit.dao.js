const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ProduitDAO {
    async create(data,caisseId) {
        const produit = await prisma.produit.create({data});

        //log action
        await prisma.produitLog.create({data: {
            produitId: produit.id,
            action: 'CREATED',
            caisseId: caisseId,
        }});
        return produit;
    }

    async findAll() {
        return await prisma.produit.findMany();
    }

    async findById(id) {
        return await prisma.produit.findUnique({ where: { id } });
    }

    async update(id, data, caisseId) {
        await prisma.produitLog.create({
            data: {
                produitId: id,
                action: 'UPDATED',
                caisseId: caisseId,
            }
        });

        return await prisma.produit.update({
            where: { id },
            data,
        });
    }

    async delete(id, caisseId) {
        const produit = await this.findById(id);
        
        await prisma.produit.delete({ where: { id } });

        if (produit) {
            await prisma.produitLog.create({
                data: {
                    produitId: id,
                    action: 'DELETED',
                    caisseId: caisseId,
                }
            });
        }
        return produit;    
    }
}

module.exports = new ProduitDAO();