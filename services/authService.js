const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const login = async (email, password) => {
    const user = await prisma.usuario.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: 'Usuario no encontrado.' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return { error: 'Contraseña incorrecta.' };
    }

    return { message: 'Login exitoso.' };
};

const register = async (data) => {
    if (!data.email || !data.password || !data.rolId) {
        throw new Error('Email, password y rol son requeridos.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const dataForDb = {
        email: data.email,
        password: hashedPassword,
        rolId: parseInt(data.rolId, 10),
    };

    return await prisma.usuario.create({
        data: dataForDb,
    });
};

module.exports = {
    login,
    register,
};
