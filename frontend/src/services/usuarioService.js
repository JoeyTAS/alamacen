import axios from "axios"

const API_URL = "http://localhost:3001/api/usuarios"

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    console.log("Datos enviados al backend:", userData); // Agrega este log
    const response = await axios.post(`${API_URL}/registro`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en registerUser:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al registrar usuario");
  }
}
  
// Iniciar sesión - VERSIÓN MODIFICADA
export const loginUser = async (email, contraseña) => {
  try {
    console.log("Intentando iniciar sesión con:", email)

    // Realizar el login normal con verificación de contraseña
    const response = await axios.post(`${API_URL}/login`, { email, contraseña })
    return response.data.usuario
  } catch (error) {
    console.error("Error en loginUser:", error)
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error("Error de conexión al servidor")
    }
  }
}

// Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener usuario")
  }
}

// Obtener usuario por email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/email/${email}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener usuario")
  }
}

// Actualizar usuario
export const updateUsuario = async (id, userData) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/usuarios/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al actualizar usuario");
  }
}

// Eliminar usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar usuario")
  }
}

// Listar todos los usuarios
export const getAllUsuarios = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener usuarios")
  }
}


// Actualizar solo el correo electrónico
export const updateEmail = async (id, email) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/email`, { email });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar correo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al actualizar correo");
  }
};


// Actualizar solo la contraseña
export const updatePassword = async (id, contraseña) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/password`, { contraseña });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar contraseña:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al actualizar contraseña");
  }
};