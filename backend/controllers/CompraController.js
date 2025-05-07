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

    async eliminarCompra(req, res) {
    try {
      const compra_id = req.params.id;
      const resultado = await CompraService.eliminarCompra(compra_id);
      if (resultado) {
        res.status(200).json({ message: 'Compra eliminada exitosamente' });
      } else {
        res.status(404).json({ error: 'Compra no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la compra' });
    }
  }
  async obtenerHistorialPorUsuario(req, res) {
    try {
      const usuario_id = req.params.id;
      const historial = await CompraService.obtenerHistorialPorUsuarioId(usuario_id); // Llamada al servicio correcto
      res.status(200).json(historial);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial de compras' });
    }
  }

  async obtenerHistorialPorUsuario(req, res) {
    try {
      const usuario_id = req.params.id;
      const historial = await CompraService.obtenerCompraPorId(usuario_id);
      res.status(200).json(historial);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial de compras' });
    }
  }
}

module.exports = new CompraController();
