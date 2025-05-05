const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');

// Ruta para crear un nuevo producto
router.post('/productos', ProductoController.crear);

// Ruta para listar todos los productos
router.get('/productos', ProductoController.listar);

// Ruta para obtener un producto por su ID
router.get('/productos/:id', ProductoController.obtenerPorId);

// Ruta para actualizar un producto por su ID
router.put('/productos/:id', ProductoController.actualizar);

// Ruta para eliminar un producto por su ID
router.delete('/productos/:id', ProductoController.eliminar);

module.exports = router;
