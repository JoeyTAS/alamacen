"use client"

import { createContext, useState, useEffect } from "react"
import { loginUser, getUserById, getUserByEmail } from "../services/usuarioService"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar la aplicación
    const checkLoggedIn = async () => {
      const userJson = localStorage.getItem("user")

      if (userJson) {
        try {
          const user = JSON.parse(userJson)
          // Verificar que el token sigue siendo válido obteniendo los datos del usuario
          const userData = await getUserById(user.id)
          setCurrentUser(userData)
        } catch (err) {
          console.error("Error al verificar usuario:", err)
          localStorage.removeItem("user")
        }
      }

      setLoading(false)
    }

    checkLoggedIn()
  }, [])

  const login = async (email, contraseña) => {
    try {
      setError(null)
      console.log("AuthContext: Intentando iniciar sesión con", email)

      // Realizar el login normal con verificación de credenciales
      const userData = await loginUser(email, contraseña)
      console.log("AuthContext: Usuario autenticado correctamente:", userData)

      setCurrentUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return userData
    } catch (err) {
      console.error("AuthContext: Error al iniciar sesión:", err)
      setError(err.message || "Error al iniciar sesión")
      throw err
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    currentUser,
    login,
    logout,
    loading,
    error,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
