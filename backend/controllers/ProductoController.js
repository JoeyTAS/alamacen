const ProductoService = require('../services/ProductoService');

class ProductoController {
  async crear(req, res) {
    try {
      const nuevo = await ProductoService.crearProducto(req.body);
      res.status(201).json({
        message: 'Producto creado exitosamente.',
        data: nuevo,
      });
    } catch (error) {
      res.status(400).json({ error: 'No se pudo crear el producto. Verifica los datos enviados.' });
    }
  }

  async listar(req, res) {
    try {
      const productos = await ProductoService.obtenerTodos();
      res.json({
        message: 'Productos obtenidos correctamente.',
        data: productos,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos.' });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const producto = await ProductoService.obtenerPorId(req.params.id);
      res.json({
        message: 'Producto encontrado.',
        data: producto,
      });
    } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  }

  async actualizar(req, res) {
    try {
      const actualizado = await ProductoService.actualizarProducto(req.params.id, req.body);
      res.json({
        message: 'Producto actualizado exitosamente.',
        data: actualizado,
      });
    } catch (error) {
      res.status(400).json({ error: 'No se pudo actualizar el producto. Verifica los datos enviados.' });
    }
  }

  async eliminar(req, res) {
    try {
      const eliminado = await ProductoService.eliminarProducto(req.params.id);
      res.json({
        message: 'Producto eliminado exitosamente.',
        data: eliminado,
      });
    } catch (error) {
      res.status(400).json({ error: 'No se pudo eliminar el producto. Intenta nuevamente.' });
    }
  }
}

module.exports = new ProductoController();
