const HistorialModel = require('../models/HistorialCompraModel');

class HistorialCompraService {
  async agregarProducto(compra_id, producto_id, cantidad, precio_unitario) {
    return await HistorialModel.addProductoToCompra(compra_id, producto_id, cantidad, precio_unitario);
  }

  async obtenerPorCompra(compra_id) {
    return await HistorialModel.getHistorialByCompra(compra_id);
  }

  async obtenerPorUsuario(usuario_id) {
    return await HistorialModel.getHistorialByUsuario(usuario_id);
  }

  async obtenerTodosLosProductosComprados() {
    return await HistorialModel.getTodosLosProductosComprados();
  }
}

module.exports = new HistorialCompraService();
