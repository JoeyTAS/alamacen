const CompraService = require('../services/CompraService');

class CompraController {
  async realizarCompra(req, res) {
    try {
      const { usuario_id, productos } = req.body;
      const compra = await CompraService.realizarCompra(usuario_id, productos);
      res.status(201).json(compra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarCompras(req, res) {
    try {
      const compras = await CompraService.obtenerCompras();
      res.json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerHistorialPorUsuario(req, res) {
    try {
      const historial = await CompraService.obtenerHistorialPorUsuario(req.params.id);
      res.json(historial);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CompraController();
