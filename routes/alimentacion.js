const express = require('express');
const router = express.Router();
const alimentacionController = require('../controllers/alimentacionController');

router.post('/', alimentacionController.createAlimentacion);
router.get('/', alimentacionController.getAllAlimentaciones);
router.get('/:id', alimentacionController.getAlimentacionById);
router.put('/:id', alimentacionController.updateAlimentacion);
router.delete('/:id', alimentacionController.deleteAlimentacion);

module.exports = router;
