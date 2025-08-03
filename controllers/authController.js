const authService = require('../services/authService');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        if (result.error) {
            return res.status(401).send(result.error);
        }
        res.redirect('/dashboard.html');
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

module.exports = {
    login,
    register,
};
