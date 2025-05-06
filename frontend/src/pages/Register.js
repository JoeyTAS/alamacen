"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/usuarioService"
import "./Auth.css"

const Register = () => {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    rol: "cliente", // Cambiado de "usuario" a "cliente"
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones básicas
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Eliminar confirmarContraseña antes de enviar al servidor
      const { confirmarContraseña, ...userData } = formData

      await registerUser(userData)
      navigate("/login")
    } catch (err) {
      setError(err.message || "Error al registrar usuario")
      console.error("Error de registro:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        <p className="auth-subtitle">Regístrese para acceder al sistema</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              name="dni"
              className="form-control"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              className="form-control"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              className="form-control"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              className="form-control"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              className="form-control"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol</label>
            <select id="rol" name="rol" className="form-control" value={formData.rol} onChange={handleChange} required>
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tiene una cuenta? <Link to="/login">Inicie sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
