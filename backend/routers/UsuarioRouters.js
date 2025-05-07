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
router.get('/', (req, res) => UsuarioController.listar(req, res));

// Ruta para eliminar un usuario por su ID
router.delete('/:id', UsuarioController.eliminar);

router.put('/:id/email', UsuarioController.actualizarEmail);

// Ruta para actualizar solo la contraseña
router.put('/:id/password', UsuarioController.actualizarContraseña);

module.exports = router;
