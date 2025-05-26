const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class CaisseDAO {
    async create(magasinId, nom, employeId) {
    return await prisma.caisse.create({ data: { magasinId, nom, employeId } });
    }

    async findAll() {
        return await prisma.caisse.findMany({include: {employe : true}});
    }

    async findById(id) {
        return await prisma.caisse.findUnique({where: {id}, include: {employe: true}});
    }

    async update(id, data) {
        return await prisma.caisse.update({
            where: {id : parseInt(id, 10)},
            data,
        });
    }

    async close(id) {
        return await prisma.caisse.delete({where: {id}});
    }
}

module.exports = new CaisseDAO();