import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getHistorialByCompra } from "../services/historialService"
import "./DetalleCompra.css"

const DetalleCompra = () => {
  const { id } = useParams()
  const [detalleCompra, setDetalleCompra] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetalleCompra = async () => {
      try {
        setLoading(true)
        const data = await getHistorialByCompra(id)

        if (data && data.length > 0) {
          // Calcular totales
          const total = data.reduce((sum, item) => sum + item.cantidad * item.precio_unitario, 0)

          setDetalleCompra({
            id,
            fecha: data[0].fecha || new Date().toISOString(),
            productos: data.map((item) => ({
              id: item.producto_id,
              nombre: item.nombre_producto,
              cantidad: item.cantidad,
              precio_unitario: item.precio_unitario,
              subtotal: item.cantidad * item.precio_unitario,
            })),
            total,
          })
        } else {
          setError("No se encontraron detalles para esta compra")
        }
      } catch (err) {
        console.error("Error al cargar detalle de compra:", err)
        setError("Error al cargar los detalles de la compra. Por favor, intente nuevamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchDetalleCompra()
  }, [id])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  if (error) {
    return (
      <div className="detalle-container">
        <div className="alert alert-danger">{error}</div>
        <Link to="/historial" className="btn btn-primary">
          Volver al Historial
        </Link>
      </div>
    )
  }

  return (
    <div className="detalle-container">
      <div className="detalle-header">
        <div>
          <h1>Detalle de Compra #{id}</h1>
          <p className="detalle-fecha">
            Fecha: {new Date(detalleCompra.fecha).toLocaleDateString()} -
            {new Date(detalleCompra.fecha).toLocaleTimeString()}
          </p>
        </div>
        <Link to="/historial" className="btn btn-secondary">
          Volver al Historial
        </Link>
      </div>

      <div className="detalle-card">
        <h2>Productos</h2>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalleCompra.productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>S/ {producto.precio_unitario.toFixed(2)}</td>
                  <td>{producto.cantidad}</td>
                  <td>S/ {producto.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right">
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>S/ {detalleCompra.total.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="detalle-actions">
          <button className="btn btn-primary" onClick={() => window.print()}>
            Imprimir Comprobante
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleCompra
