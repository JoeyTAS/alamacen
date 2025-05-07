import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getHistorialByUsuario } from "../services/historialService"
import "./HistorialCompras.css"

const HistorialCompras = () => {
  const { currentUser } = useContext(AuthContext)
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comprasAgrupadas, setComprasAgrupadas] = useState({})

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        setLoading(true)
        const data = await getHistorialByUsuario(currentUser.id)
        setHistorial(data)

        // Agrupar compras por ID
        const agrupadas = data.reduce((acc, compra) => {
          if (!acc[compra.compra_id]) {
            acc[compra.compra_id] = {
              id: compra.compra_id,
              fecha: compra.fecha,
              productos: [],
              total: 0,
            }
          }

          acc[compra.compra_id].productos.push({
            id: compra.producto_id,
            nombre: compra.producto || "Producto desconocido",
            cantidad: compra.cantidad || 0,
            precio_unitario: compra.precio_unitario || 0,
            subtotal: (compra.cantidad && compra.precio_unitario) ? (parseFloat(compra.cantidad) * parseFloat(compra.precio_unitario)) : 0,
          })

          acc[compra.compra_id].total += parseFloat(compra.cantidad) * parseFloat(compra.precio_unitario) || 0

          return acc
        }, {})

        setComprasAgrupadas(agrupadas)
      } catch (err) {
        console.error("Error al cargar historial de compras:", err)
        setError("Error al cargar el historial de compras. Por favor, intente nuevamente.")
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) {
      fetchHistorial()
    }
  }, [currentUser])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="historial-container">
      <h1>Historial de Compras</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {Object.keys(comprasAgrupadas).length > 0 ? (
        <div className="compras-list">
          {Object.values(comprasAgrupadas).map((compra) => (
            <div key={compra.id} className="compra-card">
              <div className="compra-header">
                <div>
                  <h3>Compra #{compra.id}</h3>
                  <p className="compra-fecha">
                    {new Date(compra.fecha).toLocaleDateString()} -{new Date(compra.fecha).toLocaleTimeString()}
                  </p>
                </div>
                <div className="compra-total">
                  <p>Total: S/ {compra.total.toFixed(2)}</p>
                  <Link to={`/compra/${compra.id}`} className="btn-ver-detalle">
                    Ver Detalle
                  </Link>
                </div>
              </div>

              <div className="compra-productos">
                <h4>Productos ({compra.productos.length})</h4>
                <ul className="productos-list">
                  {compra.productos.slice(0, 3).map((producto, index) => (
                    <li key={index} className="producto-item">
                      <span className="producto-nombre">{producto.nombre}</span>
                      <span className="producto-cantidad">x{producto.cantidad}</span>
                      <span className="producto-precio">S/ {producto.subtotal.toFixed(2)}</span>
                    </li>
                  ))}
                  {compra.productos.length > 3 && (
                    <li className="producto-item-more">
                      <Link to={`/compra/${compra.id}`} className="ver-mas-productos">
                        Ver más productos
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-compras">
          <p>No hay compras registradas.</p>
          <Link to="/ventas" className="btn btn-primary">
            Realizar una compra
          </Link>
        </div>
      )}
    </div>
  )
}

export default HistorialCompras
