import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAllProductos } from "../services/productoService";
import { realizarCompra } from "../services/compraService";
import "./Ventas.css";

const Ventas = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await getAllProductos();
        // Validar y limpiar datos
        const productosLimpiados = data.map((producto) => ({
          ...producto,
          precio: isNaN(Number(producto.precio)) ? 0 : Number(producto.precio),
          stock: isNaN(Number(producto.stock)) ? 0 : Number(producto.stock),
        }));
        setProductos(productosLimpiados);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar los productos. Por favor, intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Filtrar productos por término de búsqueda
  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
      // Si ya está en el carrito, incrementar cantidad
      if (productoEnCarrito.cantidad < producto.stock) {
        setCarrito(
          carrito.map((item) =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
          )
        );
      } else {
        setError(`No hay suficiente stock de ${producto.nombre}`);
        setTimeout(() => setError(null), 3000);
      }
    } else {
      // Si no está en el carrito, agregarlo con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Cambiar cantidad de un producto en el carrito
  const cambiarCantidad = (id, nuevaCantidad) => {
    const producto = productos.find((p) => p.id === id);

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }

    if (nuevaCantidad > producto.stock) {
      setError(`No hay suficiente stock de ${producto.nombre}`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // Calcular total de la compra
  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precio = isNaN(Number(item.precio)) ? 0 : Number(item.precio);
      return total + precio * item.cantidad;
    }, 0);
  };

  // Realizar compra
  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    try {
      setLoading(true);

      // Preparar datos para la API
      const compraData = {
        usuario_id: currentUser.id,
        productos: carrito.map((item) => ({
          producto_id: item.id,
          cantidad: item.cantidad,
          precio_unitario: item.precio,
        })),
      };

      // Enviar compra al servidor
      const resultado = await realizarCompra(compraData);

      // Limpiar carrito y mostrar mensaje de éxito
      setCarrito([]);
      setSuccess("¡Compra realizada con éxito!");

      // Redirigir al historial después de 2 segundos
      setTimeout(() => {
        navigate("/historial");
      }, 2000);
    } catch (err) {
      console.error("Error al realizar la compra:", err);
      setError("Error al procesar la compra. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && productos.length === 0) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="ventas-container">
      <h1>Realizar Venta</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="ventas-layout">
        <div className="productos-section">
          <div className="productos-search">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="productos-grid">
            {filteredProductos.length > 0 ? (
              filteredProductos.map((producto) => (
                <div key={producto.id} className="producto-card">
                  <h3>{producto.nombre}</h3>
                  <p className="producto-categoria">{producto.categoria}</p>
                  <p className="producto-precio">
                    S/ {isNaN(Number(producto.precio)) ? "0.00" : Number(producto.precio).toFixed(2)}
                  </p>
                  <p
                    className={`producto-stock ${
                      producto.stock < 10 ? "stock-warning" : ""
                    }`}
                  >
                    Stock: {producto.stock}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={producto.stock === 0}
                  >
                    {producto.stock === 0 ? "Sin Stock" : "Agregar"}
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results">No se encontraron productos.</p>
            )}
          </div>
        </div>

        <div className="carrito-section">
          <div className="carrito-card">
            <h2>Carrito de Compras</h2>

            {carrito.length === 0 ? (
              <p className="carrito-empty">El carrito está vacío</p>
            ) : (
              <>
                <div className="carrito-items">
                  {carrito.map((item) => (
                    <div key={item.id} className="carrito-item">
                      <div className="carrito-item-info">
                        <h4>{item.nombre}</h4>
                        <p>
                          S/ {isNaN(Number(item.precio)) ? "0.00" : Number(item.precio).toFixed(2)}{" "}
                          x {item.cantidad}
                        </p>
                      </div>
                      <div className="carrito-item-actions">
                        <div className="cantidad-control">
                          <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>
                            +
                          </button>
                        </div>
                        <button
                          className="btn-delete"
                          onClick={() => eliminarDelCarrito(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="carrito-total">
                  <h3>Total: S/ {calcularTotal().toFixed(2)}</h3>
                </div>

                <button
                  className="btn btn-primary btn-finalizar"
                  onClick={finalizarCompra}
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Finalizar Compra"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ventas;