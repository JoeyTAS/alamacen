const UsuarioModel = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class UsuarioService {
  // Registrar un nuevo usuario
  async registrarUsuario({ dni, nombres, apellidos, email, contraseña, rol }) {
    // Verificar si el correo o el DNI ya están registrados
    const existenteEmail = await UsuarioModel.getUsuarioByEmail(email);
    if (existenteEmail) {
      throw new Error('El correo electrónico ya está registrado');
    }

    const existenteDni = await UsuarioModel.getUsuarioByDni(dni);
    if (existenteDni) {
      throw new Error('El DNI ya está registrado');
    }

    // Validar rol
    if (!['cliente', 'empleado'].includes(rol)) {
      throw new Error('Rol inválido');
    }

    // Crear usuario con contraseña hasheada
    const contraseñaHasheada = await bcrypt.hash(contraseña, SALT_ROUNDS);
    return await UsuarioModel.createUsuario({
      dni,
      nombres,
      apellidos,
      email,
      contraseña: contraseñaHasheada,
      rol,
    });
  }

  // Autenticar un usuario (login)
  async autenticarUsuario(email, contraseña) {
    const usuario = await UsuarioModel.getUsuarioByEmail(email);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      throw new Error('Contraseña incorrecta');
    }

    return usuario;
  }

  // Obtener un usuario por su email
  async obtenerUsuarioPorEmail(email) {
    const usuario = await UsuarioModel.getUsuarioByEmail(email);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  // Obtener un usuario por su ID
  async obtenerUsuarioPorId(id) {
    const usuario = await UsuarioModel.getUsuarioById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  // Listar todos los usuarios
  async listarUsuarios() {
    return await UsuarioModel.getAllUsuarios();
  }

  // Eliminar un usuario
  async eliminarUsuario(id) {
    const eliminado = await UsuarioModel.deleteUsuario(id);
    if (!eliminado) {
      throw new Error('Usuario no encontrado o no se pudo eliminar');
    }
    return eliminado;
  }

  // Actualizar los datos de un usuario
  async actualizarUsuario(id, { nombres, apellidos, email, contraseña }) {
    const usuario = await UsuarioModel.getUsuarioById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    let nuevaContraseña = usuario.contraseña;
    if (contraseña) {
      nuevaContraseña = await bcrypt.hash(contraseña, SALT_ROUNDS);
    }

    return await UsuarioModel.updateUsuario(id, {
      nombres,
      apellidos,
      email,
      contraseña: nuevaContraseña,
    });
  }
}

module.exports = new UsuarioService();
