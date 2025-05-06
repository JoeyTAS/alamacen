"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getAllProductos } from "../services/productoService"
import { getHistorialByUsuario } from "../services/historialService"
import "./Dashboard.css"

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const [productos, setProductos] = useState([])
  const [historialCompras, setHistorialCompras] = useState([])
  const [productosAgotados, setProductosAgotados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Obtener todos los productos
        const productosData = await getAllProductos()
        setProductos(productosData)

        // Filtrar productos con stock bajo (menos de 10 unidades)
        const agotados = productosData.filter((producto) => producto.stock < 10)
        setProductosAgotados(agotados)

        // Obtener historial de compras del usuario actual
        if (currentUser) {
          const historialData = await getHistorialByUsuario(currentUser.id)
          setHistorialCompras(historialData)
        }
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err)
        if (err.message.includes("404")) {
          setError("No se pudo conectar con el servidor. Verifique que el servidor esté en ejecución.")
        } else {
          setError("Error al cargar los datos. Por favor, intente nuevamente.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [currentUser])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-welcome">
        Bienvenido, {currentUser?.nombres} {currentUser?.apellidos}
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total de Productos</h3>
          <p className="stat-number">{productos.length}</p>
          <Link to="/productos" className="stat-link">
            Ver todos
          </Link>
        </div>

        <div className="stat-card">
          <h3>Productos Agotados</h3>
          <p className="stat-number">{productosAgotados.length}</p>
          <Link to="/productos" className="stat-link">
            Gestionar
          </Link>
        </div>

        <div className="stat-card">
          <h3>Mis Compras</h3>
          <p className="stat-number">{historialCompras.length}</p>
          <Link to="/historial" className="stat-link">
            Ver historial
          </Link>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Productos con Stock Bajo</h2>
          {productosAgotados.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {productosAgotados.slice(0, 5).map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td className="stock-warning">{producto.stock}</td>
                      <td>S/ {producto.precio.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No hay productos con stock bajo.</p>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Últimas Compras</h2>
          {historialCompras.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {historialCompras.slice(0, 5).map((compra, index) => (
                    <tr key={index}>
                      <td>{new Date(compra.fecha).toLocaleDateString()}</td>
                      <td>{compra.producto}</td>
                      <td>{compra.cantidad}</td>
                      <td>S/ {compra.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No hay compras recientes.</p>
          )}
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/productos" className="btn btn-primary">
          Gestionar Inventario
        </Link>
        <Link to="/ventas" className="btn btn-secondary">
          Realizar Venta
        </Link>
      </div>
    </div>
  )
}

export default Dashboard