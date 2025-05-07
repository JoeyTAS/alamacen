import axios from "axios"

const API_URL = "http://localhost:3001/api/historial"

export const agregarProductoACompra = async (compraId, productoId, cantidad, precioUnitario) => {
  try {
    const response = await axios.post(API_URL, {
      compra_id: compraId,
      producto_id: productoId,
      cantidad,
      precio_unitario: precioUnitario,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al agregar producto a la compra");
  }
};

// Obtener historial de una compra específica
export const getHistorialByCompra = async (compraId) => {
  try {
    const response = await axios.get(`${API_URL}/compra/${compraId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener historial de la compra")
  }
}

// Obtener historial de compras de un usuario
export const getHistorialByUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener historial del usuario")
  }
}

// Obtener todos los productos comprados
export const getTodosLosProductosComprados = async () => {
  try {
    const response = await axios.get(`${API_URL}/historial-general`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener todos los productos comprados")
  }
}
// Exportación por defecto como objeto
const historialService = {
  agregarProductoACompra,
  getHistorialByCompra,
  getHistorialByUsuario,
  getTodosLosProductosComprados,
};

export default historialService;
