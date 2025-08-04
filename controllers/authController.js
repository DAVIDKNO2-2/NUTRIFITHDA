const authService = require('../services/authService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { enviarTokenPorCorreo } = require('../utils/emailSender');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        if (result.error) {
            return res.status(401).json({ error: result.error });
        }
        // On success, send a success message. The frontend will handle redirection.
        res.status(200).json({ message: 'Login exitoso.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logout = (req, res) => {
    // This is a placeholder as the current app is stateless (no sessions).
    // In a real app with sessions, you would destroy the session here.
    res.status(200).json({ message: 'Logout exitoso.' });
};

const enviarTokenRecuperacion = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) {
            // Respond with a generic message to prevent user enumeration
            return res.status(200).send('Si su correo electrónico está en nuestros registros, recibirá un enlace para restablecer la contraseña.');
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour expiry

        await prisma.usuario.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExpiry: expiryDate,
            },
        });

        await enviarTokenPorCorreo(email, token);

        res.status(200).send('Si su correo electrónico está en nuestros registros, recibirá un enlace para restablecer la contraseña.');

    } catch (error) {
        console.error('Error en enviarTokenRecuperacion:', error);
        res.status(500).send('Error en el servidor al intentar enviar el token.');
    }
};

const cambiarContrasena = async (req, res) => {
    const { token, nuevaContrasena } = req.body;

    try {
        if (!token || !nuevaContrasena) {
            return res.status(400).send('Token y nueva contraseña son requeridos.');
        }

        const usuario = await prisma.usuario.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gte: new Date(),
                },
            },
        });

        if (!usuario) {
            return res.status(400).send('Token inválido o expirado.');
        }

        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        res.status(200).send('Contraseña actualizada con éxito.');

    } catch (error) {
        console.error('Error en cambiarContrasena:', error);
        res.status(500).send('Error en el servidor al cambiar la contraseña.');
    }
};


module.exports = {
    login,
    register,
    logout,
    enviarTokenRecuperacion,
    cambiarContrasena,
};
