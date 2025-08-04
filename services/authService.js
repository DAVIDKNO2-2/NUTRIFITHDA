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
    // The 'confirm-password' field from the form is not needed here.
    const { password, rolId, ...userData } = data;

    if (!rolId) {
        throw new Error('El rol es requerido.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.usuario.create({
        data: {
            ...userData,
            password: hashedPassword,
            rolId: parseInt(rolId, 10),
        },
    });
};

module.exports = {
    login,
    register,
};
