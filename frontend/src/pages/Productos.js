import { useState, useEffect } from "react";
import {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productoService";
import "./Productos.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para cargar todos los productos
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await getAllProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("Error al cargar los productos. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Abrir formulario para crear nuevo producto
  const handleNewProducto = () => {
    setCurrentProducto(null);
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      stock: "",
    });
    setShowForm(true);
  };

  // Abrir formulario para editar producto existente
  const handleEditProducto = (producto) => {
    setCurrentProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      stock: producto.stock,
    });
    setShowForm(true);
  };

  // Enviar formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const precio = parseFloat(formData.precio);
    const stock = parseInt(formData.stock);
  
    if (isNaN(precio) || precio < 0) {
      setError("El precio debe ser un número mayor o igual a cero.");
      return;
    }
  
    if (isNaN(stock) || stock < 0) {
      setError("El stock debe ser un número entero mayor o igual a cero.");
      return;
    }
  
    try {
      setLoading(true);
  
      const productoData = {
        ...formData,
        precio,
        stock,
      };
  
      if (currentProducto) {
        await updateProducto(currentProducto.id, productoData);
      } else {
        await createProducto(productoData);
      }
  
      await fetchProductos();
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error("Error al guardar producto:", err);
      setError("Error al guardar el producto. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  

  // Eliminar producto
  const handleDeleteProducto = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      try {
        setLoading(true);
        await deleteProducto(id);
        await fetchProductos();
        setError(null);
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        setError(
          "Error al eliminar el producto. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Filtrar productos por término de búsqueda
  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && productos.length === 0) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h1>Gestión de Inventario</h1>
        <button className="btn btn-primary" onClick={handleNewProducto}>
          Nuevo Producto
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="productos-search">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      {showForm && (
        <div className="producto-form-container">
          <div className="producto-form-card">
            <h2>{currentProducto ? "Editar Producto" : "Nuevo Producto"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="precio">Precio (S/)</label>
                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className="form-control"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="inalambrico">inalambrico</option>
                  <option value="electrico">electrico</option>
                  <option value="manual">manual</option>
                </select>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                  {currentProducto ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.length > 0 ? (
              filteredProductos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    {/* Convertir a número antes de usar toFixed */}
                    S/{" "}
                    {isNaN(Number(producto.precio))
                      ? "0.00"
                      : Number(producto.precio).toFixed(2)}
                  </td>
                  <td className={producto.stock < 10 ? "stock-warning" : ""}>
                    {producto.stock}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleEditProducto(producto)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDeleteProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;
