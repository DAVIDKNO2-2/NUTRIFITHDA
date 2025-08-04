const alimentacionService = require('../services/alimentacionService');

const createAlimentacion = async (req, res) => {
    try {
        const alimentacion = await alimentacionService.createAlimentacion(req.body);
        res.json(alimentacion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllAlimentaciones = async (req, res) => {
    try {
        const alimentaciones = await alimentacionService.getAllAlimentaciones();
        res.json(alimentaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAlimentacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const alimentacion = await alimentacionService.getAlimentacionById(id);
        res.json(alimentacion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAlimentacion = async (req, res) => {
    try {
        const { id } = req.params;
        const alimentacion = await alimentacionService.updateAlimentacion(id, req.body);
        res.json(alimentacion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAlimentacion = async (req, res) => {
    try {
        const { id } = req.params;
        await alimentacionService.deleteAlimentacion(id);
        res.json({ message: 'Alimentacion eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAlimentacion,
    getAllAlimentaciones,
    getAlimentacionById,
    updateAlimentacion,
    deleteAlimentacion,
};
