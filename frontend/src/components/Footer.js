import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Botica "Nova Salud"</h3>
          <p>Sistema de gestión de inventario y ventas</p>
        </div>
        <div className="footer-contact">
          <p>Dirección: Av. Principal 123</p>
          <p>Teléfono: (01) 123-4567</p>
          <p>Email: contacto@novasalud.com</p>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Nova Salud. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
