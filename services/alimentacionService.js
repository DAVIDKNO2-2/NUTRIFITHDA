const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAlimentacion = async (data) => {
    const { comidas, ...alimentacionData } = data;
    return await prisma.alimentacion.create({
        data: {
            ...alimentacionData,
            comidas: {
                create: comidas,
            },
        },
        include: {
            comidas: true,
        },
    });
};

const getAllAlimentaciones = async () => {
    return await prisma.alimentacion.findMany({
        include: {
            comidas: true,
        },
    });
};

const getAlimentacionById = async (id) => {
    return await prisma.alimentacion.findUnique({
        where: { id: parseInt(id) },
        include: {
            comidas: true,
        },
    });
};

const updateAlimentacion = async (id, data) => {
    const { comidas, ...alimentacionData } = data;
    return await prisma.alimentacion.update({
        where: { id: parseInt(id) },
        data: {
            ...alimentacionData,
            comidas: {
                deleteMany: {},
                create: comidas,
            },
        },
        include: {
            comidas: true,
        },
    });
};

const deleteAlimentacion = async (id) => {
    return await prisma.alimentacion.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    createAlimentacion,
    getAllAlimentaciones,
    getAlimentacionById,
    updateAlimentacion,
    deleteAlimentacion,
};
