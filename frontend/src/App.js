import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"

// Páginas
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Productos from "./pages/Productos"
import Ventas from "./pages/Ventas"
import HistorialCompras from "./pages/HistorialCompras"
import DetalleCompra from "./pages/DetalleCompra"
import Perfil from "./pages/Perfil"

// Componentes
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Estilos
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/productos"
                element={
                  <PrivateRoute>
                    <Productos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ventas"
                element={
                  <PrivateRoute>
                    <Ventas />
                  </PrivateRoute>
                }
              />
              <Route
                path="/historial"
                element={
                  <PrivateRoute>
                    <HistorialCompras />
                  </PrivateRoute>
                }
              />
              <Route
                path="/compra/:id"
                element={
                  <PrivateRoute>
                    <DetalleCompra />
                  </PrivateRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <PrivateRoute>
                    <Perfil />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
