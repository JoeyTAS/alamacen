const UsuarioModel = require("../models/UsuarioModel")
const bcrypt = require("bcrypt")

const SALT_ROUNDS = 10

class UsuarioService {
  // Registrar un nuevo usuario
   // Registrar un nuevo usuario
   async registrarUsuario({ dni, nombres, apellidos, email, contraseña, rol }) {
    // Verificar si el correo ya está registrado
    const existente = await UsuarioModel.getUsuarioByEmail(email);
    if (existente) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Hashear la contraseña antes de guardarla
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    // Crear el nuevo usuario
    return await UsuarioModel.createUsuario({
      dni,
      nombres,
      apellidos,
      email,
      contraseña: contraseñaHasheada,
      rol,
    });
  }

// Actualizar solo la contraseña
async actualizarEmail(id, email) {
  const usuario = await UsuarioModel.getUsuarioById(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const existenteEmail = await UsuarioModel.getUsuarioByEmail(email);
  if (existenteEmail && existenteEmail.id !== id) {
    throw new Error("El correo electrónico ya está registrado por otro usuario");
  }

  return await UsuarioModel.updateEmail(id, email);
}

// Actualizar solo la contraseña
async actualizarContraseña(id, contraseña) {
  const usuario = await UsuarioModel.getUsuarioById(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  if (!contraseña || contraseña.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  // Hashear la nueva contraseña
  const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

  // Actualizar la contraseña en la base de datos
  return await UsuarioModel.updatePassword(id, contraseñaHasheada);
}
  // Obtener un usuario por su email
  async obtenerUsuarioPorEmail(email) {
    const usuario = await UsuarioModel.getUsuarioByEmail(email)
    if (!usuario) {
      throw new Error("Usuario no encontrado")
    }
    return usuario
  }

  // Obtener un usuario por su ID
  async obtenerUsuarioPorId(id) {
    const usuario = await UsuarioModel.getUsuarioById(id)
    if (!usuario) {
      throw new Error("Usuario no encontrado")
    }
    return usuario
  }

  // Listar todos los usuarios
  async listarUsuarios() {
    return await UsuarioModel.getAllUsuarios()
  }

  // Eliminar un usuario
  async eliminarUsuario(id) {
    const eliminado = await UsuarioModel.deleteUsuario(id)
    if (!eliminado) {
      throw new Error("Usuario no encontrado o no se pudo eliminar")
    }
    return eliminado
  }

  // Actualizar los detalles de un usuari


  async actualizarUsuario(id, { nombres, apellidos, email, contraseña }) {
    const usuario = await UsuarioModel.getUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
  
    // Validar campos obligatorios
    if (!nombres || !apellidos || !email) {
      throw new Error("Nombres, apellidos y correo electrónico son obligatorios");
    }
  
    // Verificar si el email ya está registrado por otro usuario
    const existenteEmail = await UsuarioModel.getUsuarioByEmail(email);
    if (existenteEmail && existenteEmail.id !== id) {
      throw new Error("El correo electrónico ya está registrado por otro usuario");
    }
  
    // Hashear la nueva contraseña si se proporciona
    let nuevaContraseña = usuario.contraseña;
    if (contraseña) {
      nuevaContraseña = await bcrypt.hash(contraseña, SALT_ROUNDS);
    }
  
    // Actualizar el usuario
    return await UsuarioModel.updateUsuario(id, {
      nombres,
      apellidos,
      email,
      contraseña: nuevaContraseña,
    });
  }


  async autenticarUsuario(email, contraseña) {
    const usuario = await UsuarioModel.getUsuarioByEmail(email);
    if (!usuario) {
      throw new Error("Credenciales inválidas");
    }

    // Comparar la contraseña ingresada con la almacenada
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      throw new Error("Credenciales inválidas");
    }

    return usuario;
  }
}



module.exports = new UsuarioService()
