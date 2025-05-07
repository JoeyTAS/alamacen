import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateEmail, updatePassword } from "../services/usuarioService";
import "./Perfil.css";

const Perfil = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nombres: currentUser?.nombres || "",
    apellidos: currentUser?.apellidos || "",
    email: currentUser?.email || "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingEmail(true);
      setError(null);

      // Actualizar solo el correo
      await updateEmail(currentUser.id, formData.email);

      setSuccess("Correo actualizado correctamente");

      // Mostrar mensaje de éxito por 3 segundos
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Error al actualizar correo:", err);
      setError("Error al actualizar el correo. Por favor, intente nuevamente.");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoadingPassword(true);
      setError(null);

      // Actualizar solo la contraseña
      await updatePassword(currentUser.id, formData.contraseña);

      setSuccess("Contraseña actualizada correctamente");

      // Limpiar campos de contraseña
      setFormData({
        ...formData,
        contraseña: "",
        confirmarContraseña: "",
      });

      // Mostrar mensaje de éxito por 3 segundos
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Error al actualizar contraseña:", err);
      setError("Error al actualizar la contraseña. Por favor, intente nuevamente.");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="perfil-container">
      <h1>Mi Perfil</h1>

      <div className="perfil-card">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleEmailSubmit} className="perfil-form">
          <div className="form-group">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              className="form-control"
              readOnly // Campo no editable
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              className="form-control"
              readOnly // Campo no editable
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

          <button type="submit" className="btn btn-primary" disabled={loadingEmail}>
            {loadingEmail ? "Guardando..." : "Guardar Correo"}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="perfil-form">
          <div className="form-group">
            <label htmlFor="contraseña">Nueva Contraseña</label>
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
              disabled={!formData.contraseña} // Deshabilitar si no hay contraseña
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loadingPassword}>
            {loadingPassword ? "Guardando..." : "Guardar Contraseña"}
          </button>
        </form>

        <div className="perfil-actions">
          <button type="button" className="btn btn-danger" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
