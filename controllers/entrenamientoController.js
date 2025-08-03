const entrenamientoService = require('../services/entrenamientoService');

const createEntrenamiento = async (req, res) => {
    try {
        const entrenamiento = await entrenamientoService.createEntrenamiento(req.body);
        res.json(entrenamiento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllEntrenamientos = async (req, res) => {
    try {
        const entrenamientos = await entrenamientoService.getAllEntrenamientos();
        res.json(entrenamientos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEntrenamientoById = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenamiento = await entrenamientoService.getEntrenamientoById(id);
        res.json(entrenamiento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateEntrenamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenamiento = await entrenamientoService.updateEntrenamiento(id, req.body);
        res.json(entrenamiento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteEntrenamiento = async (req, res) => {
    try {
        const { id } = req.params;
        await entrenamientoService.deleteEntrenamiento(id);
        res.json({ message: 'Entrenamiento eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntrenamiento,
    getAllEntrenamientos,
    getEntrenamientoById,
    updateEntrenamiento,
    deleteEntrenamiento,
};
