import axios from "axios";

const API_URL = "http://localhost:3001/api/compra";

// Realizar una nueva compra
const realizarCompra = async (compraData) => {
  console.log("realizarCompra fue llamado con:", compraData);
  try {
    const response = await axios.post(`${API_URL}/compras`, compraData);
    return response.data;
  } catch (error) {
    console.error("Error en realizarCompra:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al realizar la compra");
  }
};

// Obtener compra por ID
const getCompraById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/compras/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener la compra");
  }
};

// Eliminar una compra
const deleteCompra = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/compras/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar la compra");
  }
};

// Obtener historial de compras por usuario
const getComprasByUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/compras/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener el historial de compras");
  }
};

// Exportación por defecto como objeto
const compraService = {
  realizarCompra,
  getCompraById,
  deleteCompra,
  getComprasByUsuario,
};

export default compraService;