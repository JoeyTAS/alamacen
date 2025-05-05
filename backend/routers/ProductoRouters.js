const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');

// Ruta para crear un nuevo producto
router.post('/productos', ProductoController.crear);

// Ruta para listar todos los productos
router.get('/productos_listar', ProductoController.listar);

// Ruta para obtener un producto por su ID
router.get('/:id', ProductoController.obtenerPorId);

// Ruta para actualizar un producto por su ID
router.put('/actualizar/:id', ProductoController.actualizar);

// Ruta para eliminar un producto por su ID
router.delete('/eliminar/:id', ProductoController.eliminar);

module.exports = router;
