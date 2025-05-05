const ProductoModel = require('../models/ProductoModel');

class ProductoService {
  async crearProducto(data) {
    return await ProductoModel.createProducto(data);
  }

  async obtenerTodos() {
    return await ProductoModel.getAllProductos();
  }

  async obtenerPorId(id) {
    return await ProductoModel.getProductoById(id);
  }

  async actualizarProducto(id, data) {
    return await ProductoModel.updateProducto(id, data);
  }

  async eliminarProducto(id) {
    return await ProductoModel.deleteProducto(id);
  }
}

module.exports = new ProductoService();
