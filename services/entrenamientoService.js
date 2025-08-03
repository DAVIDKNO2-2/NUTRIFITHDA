const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEntrenamiento = async (data) => {
    return await prisma.rutina.create({
        data,
    });
};

const getAllEntrenamientos = async () => {
    return await prisma.rutina.findMany({
        include: {
            ejercicios: true,
        },
    });
};

const getEntrenamientoById = async (id) => {
    return await prisma.rutina.findUnique({
        where: { id: parseInt(id) },
        include: {
            ejercicios: true,
        },
    });
};

const updateEntrenamiento = async (id, data) => {
    return await prisma.rutina.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteEntrenamiento = async (id) => {
    return await prisma.rutina.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    createEntrenamiento,
    getAllEntrenamientos,
    getEntrenamientoById,
    updateEntrenamiento,
    deleteEntrenamiento,
};
