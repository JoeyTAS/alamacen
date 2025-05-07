import axios from "axios";

const API_URL = "http://localhost:3001/api/reniec";

/**
 * Consulta los datos de RENIEC por DNI.
 * @param {string} dni - El número de DNI a consultar.
 * @returns {Promise<object|null>} - Objeto con los datos de la persona o null si no se encuentra.
 */
export const getReniecDataByDni = async (dni) => {
  try {
    const response = await axios.get(`${API_URL}/${dni}`);
    return response.data;
  } catch (error) {
    console.error("Error al consultar datos de RENIEC:", error.response?.data || error.message);
    return null;
  }
};