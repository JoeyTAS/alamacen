import axios from "axios"

const API_URL = "http://localhost:3001/api/compra"

// Realizar una nueva compra
export const realizarCompra = async (compraData) => {
  try {
    const response = await axios.post(`${API_URL}/realizar`, compraData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al realizar la compra")
  }
}

// Obtener compra por ID
export const getCompraById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener la compra")
  }
}

// Eliminar una compra
export const deleteCompra = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar la compra")
  }
}

// Obtener historial de compras por usuario
export const getComprasByUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener el historial de compras")
  }
}
