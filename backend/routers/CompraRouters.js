const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');

// Ruta para realizar una compra
router.post('/compras', CompraController.realizarCompra);

// Ruta para listar todas las compras
router.get('/compras', CompraController.listarCompras);

// Ruta para obtener el historial de compras de un usuario
router.get('/compras/usuario/:id', CompraController.obtenerHistorialPorUsuario);

module.exports = router;
