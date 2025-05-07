import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/usuarioService";
import { getReniecDataByDni } from "../services/reniecService";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    rol: "cliente",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDniSearch = async () => {
    if (formData.dni.length === 8 && !isNaN(formData.dni)) {
      try {
        const reniecData = await getReniecDataByDni(formData.dni);
        if (reniecData) {
          setFormData({
            ...formData,
            nombres: reniecData.nombres,
            apellidos: `${reniecData.apellidoPaterno} ${reniecData.apellidoMaterno}`,
          });
          setError(""); // Limpia cualquier error previo
        } else {
          setError("No se encontraron datos para el DNI proporcionado");
        }
      } catch (err) {
        setError("Error al consultar los datos de RENIEC");
      }
    } else {
      setError("El DNI debe tener exactamente 8 dígitos numéricos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { confirmarContraseña, ...userData } = formData;
      await registerUser(userData);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        <p className="auth-subtitle">Regístrese para acceder al sistema</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                id="dni"
                name="dni"
                className="form-control"
                value={formData.dni}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleDniSearch}
                style={{ marginLeft: "10px" }}
              >
                Buscar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              className="form-control"
              value={formData.nombres}
              readOnly // Campo no editable
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
              readOnly // Campo no editable
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
  );
};

export default Register;