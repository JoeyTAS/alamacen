const { getReniecDataByDni } = require("../services/ReniecService");

class ReniecController {
  async obtenerDatosPorDni(req, res) {
    try {
      const { dni } = req.params;

      if (!dni || dni.length !== 8 || isNaN(dni)) {
        return res.status(400).json({ error: "El DNI debe tener exactamente 8 dígitos numéricos" });
      }

      const datos = await getReniecDataByDni(dni);

      if (!datos) {
        return res.status(404).json({ error: "No se encontraron datos para el DNI proporcionado" });
      }

      res.status(200).json(datos);
    } catch (error) {
      console.error("Error al obtener datos de RENIEC:", error.message);
      res.status(500).json({ error: "Error al consultar los datos de RENIEC" });
    }
  }
}

module.exports = new ReniecController();