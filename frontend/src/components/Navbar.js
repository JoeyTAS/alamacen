"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "./Navbar.css"

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Nova Salud
        </Link>

        {currentUser ? (
          <>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/productos" className="nav-link">
                  Inventario
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ventas" className="nav-link">
                  Ventas
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/historial" className="nav-link">
                  Historial
                </Link>
              </li>
            </ul>

            <div className="nav-user">
              <Link to="/perfil" className="nav-link">
                {currentUser.nombres}
              </Link>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          <ul className="nav-menu">
            <li className="nav-item">
              
            </li>
            <li className="nav-item">
            
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
