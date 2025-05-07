import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Botica "Nova Tools"</h3>
          <p>Sistema de gestión de inventario y ventas</p>
        </div>
        <div className="footer-contact">
          <p>Dirección: Av 123</p>
          <p>Teléfono: 9551458452</p>
          <p>Email: contacto@novatools.com</p>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Nova Tools. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
