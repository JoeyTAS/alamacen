const UsuarioService = require("../services/UsuarioService")

class UsuarioController {
  // Registrar un nuevo usuario
  async registrar(req, res) {
    try {
      const { dni, nombres, apellidos, email, contraseña, rol } = req.body;
      const nuevoUsuario = await UsuarioService.registrarUsuario({
        dni,
        nombres,
        apellidos,
        email,
        contraseña,
        rol,
      });
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Autenticar usuario (login)
  async login(req, res) {
    try {
      console.log("Recibida solicitud de login:", req.body);
      const { email, contraseña } = req.body;
  
      // Autenticar usuario con email y contraseña
      const usuario = await UsuarioService.autenticarUsuario(email, contraseña);
      console.log("Usuario autenticado correctamente");
      res.status(200).json({ usuario });
    } catch (error) {
      console.error("Error de autenticación:", error.message);
      res.status(400).json({ error: "Credenciales inválidas" });
    }
  }

  // Obtener usuario por email
  async obtenerPorEmail(req, res) {
    try {
      const usuario = await UsuarioService.obtenerUsuarioPorEmail(req.params.email)
      res.status(200).json(usuario)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }

  // Obtener usuario por ID
  async obtenerPorId(req, res) {
    try {
      const usuario = await UsuarioService.obtenerUsuarioPorId(req.params.id)
      res.status(200).json(usuario)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }

  // Listar todos los usuarios
  async listar(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios()
      res.status(200).json(usuarios)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // Eliminar un usuario
  async eliminar(req, res) {
    try {
      const eliminado = await UsuarioService.eliminarUsuario(req.params.id)
      res.status(200).json({ message: "Usuario eliminado correctamente", eliminado })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
// Actualizar solo la contraseña
async actualizarEmail(req, res) {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const usuarioActualizado = await UsuarioService.actualizarEmail(id, email);
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Actualizar solo la contraseña
async actualizarContraseña(req, res) {
  try {
    const { id } = req.params;
    const { contraseña } = req.body;

    const usuarioActualizado = await UsuarioService.actualizarContraseña(id, contraseña);
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

  // Actualizar los detalles de un usuario
  async actualizar(req, res) {
    try {
      const { nombres, apellidos, email, contraseña } = req.body
      const actualizado = await UsuarioService.actualizarUsuario(req.params.id, {
        nombres,
        apellidos,
        email,
        contraseña,
      })
      res.status(200).json(actualizado)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new UsuarioController()
