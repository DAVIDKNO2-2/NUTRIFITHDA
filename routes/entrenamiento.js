const express = require('express');
const router = express.Router();
const entrenamientoController = require('../controllers/entrenamientoController');

router.post('/', entrenamientoController.createEntrenamiento);
router.get('/', entrenamientoController.getAllEntrenamientos);
router.get('/:id', entrenamientoController.getEntrenamientoById);
router.put('/:id', entrenamientoController.updateEntrenamiento);
router.delete('/:id', entrenamientoController.deleteEntrenamiento);

module.exports = router;
