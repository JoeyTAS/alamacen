const db = require('../config/db');
const bcrypt = require('bcrypt'); // Importamos bcrypt para el hash de contraseñas

class UsuarioModel {

  // Obtener todos los usuarios
  async getAllUsuarios() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  // Obtener usuario por ID
  async getUsuarioById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Obtener usuario por DNI
  async getUsuarioByDni(dni) {
    const result = await db.query('SELECT * FROM usuarios WHERE dni = $1', [dni]);
    return result.rows[0];
  }

  // Obtener usuario por correo electrónico
  async getUsuarioByEmail(email) {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }

  // Crear un nuevo usuario con hash de contraseña
  async createUsuario({ dni, nombres, apellidos, email, contraseña, rol }) {
    const saltRounds = 10; // Número de rondas para generar el salt
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds); // Hash de la contraseña

    const result = await db.query(
      `INSERT INTO usuarios (dni, nombres, apellidos, email, contraseña, rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [dni, nombres, apellidos, email, hashedPassword, rol]
    );
    return result.rows[0];
  }

  // Actualizar un usuario con nueva contraseña (si la hay)
  async updateUsuario(id, { nombres, apellidos, email, contraseña }) {
    let query = `UPDATE usuarios
                 SET nombres = $1, apellidos = $2, email = $3`;
    const values = [nombres, apellidos, email];

    // Si la contraseña se actualiza, también la hasheamos
    if (contraseña) {
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      query += `, contraseña = $4`;
      values.push(hashedPassword);
    }

    query += ` WHERE id = $${values.length + 1} RETURNING *`; // El ID es el último parámetro
    values.push(id);

    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Eliminar un usuario
  async deleteUsuario(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Verificar si la contraseña es correcta
  async validatePassword(email, password) {
    const usuario = await this.getUsuarioByEmail(email);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña proporcionada con la almacenada (hash)
    const isMatch = await bcrypt.compare(password, usuario.contraseña);

    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    return usuario;  // Si las credenciales son correctas
  }
}

module.exports = new UsuarioModel();
