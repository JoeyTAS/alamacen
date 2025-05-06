
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { updateUsuario } from "../services/usuarioService"
import "./Perfil.css"

const Perfil = () => {
  const { currentUser, logout } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    nombres: currentUser?.nombres || "",
    apellidos: currentUser?.apellidos || "",
    email: currentUser?.email || "",
    contraseña: "",
    confirmarContraseña: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar contraseñas si se están actualizando
    if (formData.contraseña) {
      if (formData.contraseña !== formData.confirmarContraseña) {
        setError("Las contraseñas no coinciden")
        return
      }

      if (formData.contraseña.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres")
        return
      }
    }

    try {
      setLoading(true)
      setError(null)

      // Eliminar confirmarContraseña antes de enviar al servidor
      const { confirmarContraseña, ...userData } = formData

      // Si la contraseña está vacía, no la enviamos
      if (!userData.contraseña) {
        delete userData.contraseña
      }

      await updateUsuario(currentUser.id, userData)

      setSuccess("Perfil actualizado correctamente")

      // Limpiar campos de contraseña
      setFormData({
        ...formData,
        contraseña: "",
        confirmarContraseña: "",
      })

      // Mostrar mensaje de éxito por 3 segundos
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (err) {
      console.error("Error al actualizar perfil:", err)
      setError("Error al actualizar el perfil. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="perfil-container">
      <h1>Mi Perfil</h1>

      <div className="perfil-card">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="perfil-form">
          <div className="form-group">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Nueva Contraseña (dejar en blanco para mantener la actual)</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContraseña">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              className="form-control"
              disabled={!formData.contraseña}
            />
          </div>

          <div className="perfil-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>

            <button type="button" className="btn btn-danger" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Perfil
