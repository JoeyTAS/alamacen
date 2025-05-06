import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/producto/productos_listar"

// Obtener todos los productos
export const getAllProductos = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener productos")
  }
}

// Obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener producto")
  }
}

// Crear un nuevo producto
export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(API_URL, productoData)
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al crear producto")
  }
}

// Actualizar un producto
export const updateProducto = async (id, productoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productoData)
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al actualizar producto")
  }
}

// Eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar producto")
  }
}