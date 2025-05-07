import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/producto";

// Obtener todos los productos
export const getAllProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos_listar`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener productos");
  }
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener producto");
  }
};

// Crear un nuevo producto
export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, productoData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al crear producto");
  }
};

// Actualizar un producto
export const updateProducto = async (id, productoData) => {
  try {
    if (!productoData.nombre || !productoData.descripcion || productoData.precio == null || productoData.stock == null) {
      throw new Error("Faltan datos obligatorios para actualizar el producto");
    }

    const response = await axios.put(`${API_URL}/actualizar/${id}`, productoData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al actualizar producto");
  }
};

// Eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar producto");
  }
};
