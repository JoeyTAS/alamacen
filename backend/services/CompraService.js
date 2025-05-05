const CompraModel = require('../models/CompraModel');

class CompraService {
  async crearCompra(usuario_id) {
    return await CompraModel.createCompra(usuario_id);
  }

  async obtenerComprasDeUsuario(usuario_id) {
    return await CompraModel.getComprasByUsuario(usuario_id);
  }

  async obtenerCompraPorId(id) {
    return await CompraModel.getCompraById(id);
  }

  async eliminarCompra(id) {
    return await CompraModel.deleteCompra(id);
  }
}

module.exports = new CompraService();
