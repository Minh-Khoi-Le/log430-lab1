const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class EmployeDAO {
    async create(nom) {
        return await prisma.employe.create({ data : { nom } });
    }

    async findAll() {
        return await prisma.employe.findMany();
    }

    async findById(id) {
        return await prisma.employe.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.employe.update({
            where: { id: parseInt(id, 10) },
            data,
        });
    }

    async delete(id) {
        return await prisma.employe.delete({ where: { id } });
    }
}

module.exports = new EmployeDAO();