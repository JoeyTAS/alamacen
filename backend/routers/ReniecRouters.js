const express = require("express");
const ReniecController = require("../controllers/ReniecController");

const router = express.Router();

// Ruta para obtener datos de RENIEC por DNI
router.get("/:dni", ReniecController.obtenerDatosPorDni);

module.exports = router;