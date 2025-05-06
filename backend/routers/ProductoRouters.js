const express = require("express")
const router = express.Router()
const ProductoController = require("../controllers/ProductoController")

// Ruta para listar todos los productos (ruta principal)
router.get("/", ProductoController.listar)

// Ruta alternativa para listar productos (mantener compatibilidad)
router.get("/productos_listar", ProductoController.listar)

// Ruta para crear un nuevo producto
router.post("/", ProductoController.crear)
router.post("/productos", ProductoController.crear) // Ruta alternativa

// Ruta para obtener un producto por su ID
router.get("/:id", ProductoController.obtenerPorId)

// Ruta para actualizar un producto por su ID
router.put("/:id", ProductoController.actualizar)
router.put("/actualizar/:id", ProductoController.actualizar) // Ruta alternativa

// Ruta para eliminar un producto por su ID
router.delete("/:id", ProductoController.eliminar)
router.delete("/eliminar/:id", ProductoController.eliminar) // Ruta alternativa

module.exports = router
