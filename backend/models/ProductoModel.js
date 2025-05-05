const db = require('../config/db');

class ProductoModel {
  // Obtener todos los productos
  async getAllProductos() {
    const result = await db.query('SELECT * FROM productos ORDER BY nombre');
    return result.rows;
  }

  // Obtener un producto por su ID
  async getProductoById(id) {
    const result = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Crear un nuevo producto
  async createProducto({ nombre, descripcion, precio, categoria, stock }) {
    const result = await db.query(
      `INSERT INTO productos (nombre, descripcion, precio, categoria, stock)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, precio, categoria, stock]
    );
    return result.rows[0];
  }

  // Actualizar un producto
  async updateProducto(id, { nombre, descripcion, precio, categoria, stock }) {
    const result = await db.query(
      `UPDATE productos 
       SET nombre = $1, descripcion = $2, precio = $3, categoria = $4, stock = $5
       WHERE id = $6 RETURNING *`,
      [nombre, descripcion, precio, categoria, stock, id]
    );
    return result.rows[0];
  }

  // Eliminar un producto
  async deleteProducto(id) {
    const result = await db.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Actualizar solo el stock (por ejemplo después de una compra)
  async updateStock(id, nuevoStock) {
    const result = await db.query(
      `UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *`,
      [nuevoStock, id]
    );
    return result.rows[0];
  }
}

module.exports = new ProductoModel();
