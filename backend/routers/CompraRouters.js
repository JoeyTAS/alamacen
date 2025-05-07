const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');

router.get('/compras/usuario/:id', CompraController.obtenerHistorialPorUsuario);
router.post('/compras', CompraController.realizarCompra);
router.delete('/compras/:id', CompraController.eliminarCompra);

module.exports = router;
