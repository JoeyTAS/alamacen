const db = require('../config/db');

class HistorialCompraModel {
  // Registrar productos de una compra
  async addProductoToCompra(compra_id, producto_id, cantidad, precio_unitario) {
    const query = `
      INSERT INTO historial_compras (compra_id, producto_id, cantidad, precio_unitario)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(query, [compra_id, producto_id, cantidad, precio_unitario]);
    return result.rows[0];
  }

  // Obtener productos comprados en una compra específica
  async getHistorialByCompra(compra_id) {
    const result = await db.query(
      `SELECT hc.*, p.nombre AS nombre_producto 
       FROM historial_compras hc
       JOIN productos p ON hc.producto_id = p.id
       WHERE compra_id = $1`,
      [compra_id]
    );
    return result.rows;
  }

  // Obtener historial completo de compras de un usuario
  async getHistorialByUsuario(usuario_id) {
    const result = await db.query(
      `SELECT c.id AS compra_id, c.fecha, 
              p.id AS producto_id, p.nombre AS producto, 
              hc.cantidad, hc.precio_unitario,
              (hc.cantidad * hc.precio_unitario) AS total
       FROM compras c
       JOIN historial_compras hc ON c.id = hc.compra_id
       JOIN productos p ON hc.producto_id = p.id
       WHERE c.usuario_id = $1
       ORDER BY c.fecha DESC`,
      [usuario_id]
    );
    return result.rows;
  }

  
  async getTodosLosProductosComprados() {
    const result = await db.query(
      `SELECT u.id AS usuario_id, u.nombre AS usuario_nombre, 
              p.id AS producto_id, p.nombre AS producto_nombre, 
              hc.cantidad, hc.precio_unitario,
              (hc.cantidad * hc.precio_unitario) AS total
       FROM usuarios u
       JOIN compras c ON u.id = c.usuario_id
       JOIN historial_compras hc ON c.id = hc.compra_id
       JOIN productos p ON hc.producto_id = p.id
       ORDER BY u.id, p.nombre`
    );
    return result.rows;
  }

  


}

module.exports = new HistorialCompraModel();
