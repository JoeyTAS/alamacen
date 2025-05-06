"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "./Auth.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!email || !password) {
      setError("Por favor complete todos los campos")
      return
    }

    // Validación del formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un correo electrónico válido")
      return
    }

    try {
      setLoading(true)
      console.log("Login: Intentando iniciar sesión con", email)
      await login(email.trim(), password)
      console.log("Login: Inicio de sesión exitoso, redirigiendo...")
      navigate("/")
    } catch (err) {
      console.error("Login: Error de inicio de sesión:", err)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  // Función de inicio de sesión directo (bypass)
  const handleDirectLogin = async () => {
    try {
      setLoading(true)
      setError("")
      console.log("Login: Intentando inicio de sesión directo con", email)

      // Almacenar usuario directamente en localStorage sin verificación
      const fakeUser = {
        id: 1, // Este ID debe existir en tu base de datos
        email: email,
        nombres: "Usuario",
        apellidos: "Temporal",
        rol: "cliente",
      }

      localStorage.setItem("user", JSON.stringify(fakeUser))
      console.log("Login: Usuario almacenado en localStorage:", fakeUser)

      // Recargar la página para que AuthContext detecte el usuario en localStorage
      window.location.href = "/"
    } catch (err) {
      console.error("Login: Error en inicio de sesión directo:", err)
      setError("Error en inicio de sesión directo")
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <p className="auth-subtitle">Acceda a su cuenta para gestionar el sistema</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          {/* Botón de inicio de sesión directo (solo para depuración) */}
          <button
            type="button"
            className="btn btn-secondary btn-block mt-2"
            onClick={handleDirectLogin}
            disabled={loading || !email}
          >
            Acceso Directo (Depuración)
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tiene una cuenta? <Link to="/register">Regístrese aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
