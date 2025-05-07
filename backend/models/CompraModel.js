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

  // Obtener el historial de una compra por ID
  async getHistorialByCompraId(compra_id) {
    const query = `
      SELECT hc.id, hc.compra_id, hc.producto_id, hc.cantidad, hc.precio_unitario, p.nombre AS nombre_producto
      FROM historial_compras hc
      JOIN productos p ON hc.producto_id = p.id
      WHERE hc.compra_id = $1
    `;
    const result = await db.query(query, [compra_id]);
    return result.rows;
  }

  // Obtener el historial de compras por usuario
  async getHistorialByUsuarioId(usuario_id) {
    const query = `
      SELECT c.id AS compra_id, c.fecha, hc.producto_id, hc.cantidad, hc.precio_unitario, p.nombre AS nombre_producto
      FROM compras c
      JOIN historial_compras hc ON c.id = hc.compra_id
      JOIN productos p ON hc.producto_id = p.id
      WHERE c.usuario_id = $1
      ORDER BY c.fecha DESC
    `;
    const result = await db.query(query, [usuario_id]);
    return result.rows;
  }

  // Eliminar una compra
  async deleteCompra(id) {
    const result = await db.query('DELETE FROM compras WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new CompraModel();
