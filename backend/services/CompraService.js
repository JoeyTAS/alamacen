const CompraModel = require('../models/CompraModel');

class CompraService {
  // Crear una nueva compra
  async realizarCompra(usuario_id) { //
    return await CompraModel.createCompra(usuario_id);
  }

  // Obtener una compra por ID
  async obtenerCompraPorId(id) {
    return await CompraModel.getCompraById(id);
  }

  // Obtener el historial de una compra por ID
  async obtenerHistorialPorCompraId(compra_id) {
    return await CompraModel.getHistorialByCompraId(compra_id);
  }

  // Obtener el historial de compras por usuario
  async obtenerHistorialPorUsuarioId(usuario_id) {
    return await CompraModel.getHistorialByUsuarioId(usuario_id);
  }

  // Eliminar una compra
  async eliminarCompra(id) {
    return await CompraModel.deleteCompra(id);
  }
}

module.exports = new CompraService();
