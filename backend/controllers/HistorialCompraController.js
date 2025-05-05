const HistorialCompraService = require('../services/HistorialCompraService');

class HistorialCompraController {
  // POST /historial
  async agregarProducto(req, res) {
    try {
      const { compra_id, producto_id, cantidad, precio_unitario } = req.body;
      const historial = await HistorialCompraService.agregarProducto(
        compra_id,
        producto_id,
        cantidad,
        precio_unitario
      );
      res.status(201).json(historial);
    } catch (error) {
      console.error('Error al agregar producto al historial:', error);
      res.status(500).json({ error: 'Error al agregar producto al historial' });
    }
  }

  // GET /historial/compra/:compra_id
  async obtenerPorCompra(req, res) {
    try {
      const { compra_id } = req.params;
      const historial = await HistorialCompraService.obtenerPorCompra(compra_id);
      res.json(historial);
    } catch (error) {
      console.error('Error al obtener historial por compra:', error);
      res.status(500).json({ error: 'Error al obtener historial por compra' });
    }
  }

  // GET /historial/usuario/:usuario_id
  async obtenerPorUsuario(req, res) {
    try {
      const { usuario_id } = req.params;
      const historial = await HistorialCompraService.obtenerPorUsuario(usuario_id);
      res.json(historial);
    } catch (error) {
      console.error('Error al obtener historial por usuario:', error);
      res.status(500).json({ error: 'Error al obtener historial por usuario' });
    }
  }
}

module.exports = new HistorialCompraController();
