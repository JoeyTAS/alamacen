const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Ruta para registrar un nuevo usuario
router.post('/registro', UsuarioController.registrar);

// Ruta para iniciar sesión (autenticación)
router.post('/login', UsuarioController.login);

// Ruta para obtener un usuario por su ID
router.get('/:id', UsuarioController.obtenerPorId);

// Ruta para obtener un usuario por su correo electrónico
router.get('/email/:email', UsuarioController.obtenerPorEmail);

// Ruta para listar todos los usuarios
router.get('/',(req, res) => UsuarioController.listar(req, res));
//router.get('/', UsuarioController.listar);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', UsuarioController.eliminar);

// Ruta para actualizar los detalles de un usuario
router.put('/:id', UsuarioController.actualizar);

module.exports = router;
