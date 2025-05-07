const db = require('../config/db');

class ProductoService {
  async crearProducto(data) {
    const { nombre, descripcion, precio, categoria, stock } = data;
    const result = await db.query(
      `INSERT INTO productos (nombre, descripcion, precio, categoria, stock)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, precio, categoria, stock]
    );
    return result.rows[0];
  }

  async obtenerTodos() {
    const result = await db.query(`SELECT * FROM productos`);
    return result.rows;
  }

  async obtenerPorId(id) {
    const result = await db.query(`SELECT * FROM productos WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async actualizarProducto(id, data) {
    const { nombre, descripcion, precio, categoria, stock } = data;
    const result = await db.query(
      `UPDATE productos 
       SET nombre = $1, descripcion = $2, precio = $3, categoria = $4, stock = $5
       WHERE id = $6 RETURNING *`,
      [nombre, descripcion, precio, categoria, stock, id]
    );
    return result.rows[0];
  }

  async eliminarProducto(id) {
    const result = await db.query(`DELETE FROM productos WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  }
}

module.exports = new ProductoService();