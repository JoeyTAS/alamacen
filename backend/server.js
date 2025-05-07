const express = require('express');
const cors = require('cors');
const UsuarioRouters = require('./routers/UsuarioRouters'); 
const CompraRouters = require('./routers/CompraRouters'); 
const HistorialRouters = require('./routers/HistorialRouters'); 
const ProductoRouters = require('./routers/ProductoRouters'); 

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    // Registra las rutas para usuarios
    this.app.use('/api/compra', CompraRouters); // '/api/compra' como prefijo para las rutas de compra
    this.app.use('/api/historial', HistorialRouters); // '/api/historial' como prefijo para las rutas de historial
    this.app.use('/api/producto', ProductoRouters); // '/api/producto' como prefijo para las rutas de producto
    this.app.use('/api/usuarios', UsuarioRouters); // '/api/usuarios' como prefijo para las rutas de usuario
  }

  start() {
    const PORT = process.env.PORT || 3001;
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  }
}

const server = new Server();
server.start();
