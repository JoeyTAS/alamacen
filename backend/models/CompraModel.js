const db = require('../config/db');

class CompraModel {
  // Crear una nueva compra (solo cabecera)
  async createCompra(usuario_id) {
    const result = await db.query(
      `INSERT INTO compras (usuario_id) VALUES ($1) RETURNING *`,
      [usuario_id]
    );
    return result.rows[0];
  }

  // Obtener una compra por ID
  async getCompraById(id) {
    const result = await db.query('SELECT * FROM compras WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Eliminar una compra
  async deleteCompra(id) {
    const result = await db.query('DELETE FROM compras WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new CompraModel();
