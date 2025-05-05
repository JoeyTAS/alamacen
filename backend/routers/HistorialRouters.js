const express = require('express');
const router = express.Router();
const HistorialCompraController = require('../controllers/HistorialCompraController');

// Registrar un producto en una compra
router.post('/', HistorialCompraController.agregarProducto);

// Obtener historial por ID de compra
router.get('/compra/:compra_id', HistorialCompraController.obtenerPorCompra);

// Obtener historial por ID de usuario
router.get('/usuario/:usuario_id', HistorialCompraController.obtenerPorUsuario);

module.exports = router;
