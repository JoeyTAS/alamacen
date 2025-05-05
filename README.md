
---

## 📦 API de Control de Compras, Productos y Usuarios

### 🛒 Compras

| Método   | Ruta                              | Descripción                      | Enlace                                                                                                   |
| -------- | --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/compra/compras`             | Realiza una nueva compra         | [http://localhost:3001/api/compra/compras](http://localhost:3001/api/compra/compras)                     |
| `DELETE` | `/api/compra/compras/:id`         | Elimina una compra por ID        | [http://localhost:3001/api/compra/compras/1](http://localhost:3001/api/compra/compras/1)                 |
| `GET`    | `/api/compra/compras/usuario/:id` | Historial de compras por usuario | [http://localhost:3001/api/compra/compras/usuario/1](http://localhost:3001/api/compra/compras/usuario/1) |

---

### 📚 Historial de Compras

| Método | Ruta                                 | Descripción                         | Enlace                                                                                         |
| ------ | ------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| `POST` | `/api/historial/`                    | Agrega producto a una compra        | [http://localhost:3001/api/historial/](http://localhost:3001/api/historial/)                   |
| `GET`  | `/api/historial/compra/:compra_id`   | Obtiene historial por ID de compra  | [http://localhost:3001/api/historial/compra/1](http://localhost:3001/api/historial/compra/1)   |
| `GET`  | `/api/historial/usuario/:usuario_id` | Obtiene historial por ID de usuario | [http://localhost:3001/api/historial/usuario/1](http://localhost:3001/api/historial/usuario/1) |

---

### 📦 Productos

| Método   | Ruta                             | Descripción                | Enlace                                                                                                      |
| -------- | -------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/producto/productos`        | Crea un nuevo producto     | [http://localhost:3001/api/producto/productos](http://localhost:3001/api/producto/productos)                |
| `GET`    | `/api/producto/productos_listar` | Lista todos los productos  | [http://localhost:3001/api/producto/productos\_listar](http://localhost:3001/api/producto/productos_listar) |
| `GET`    | `/api/producto/:id`              | Obtiene un producto por ID | [http://localhost:3001/api/producto/1](http://localhost:3001/api/producto/1)                                |
| `PUT`    | `/api/producto/actualizar/:id`   | Actualiza un producto      | [http://localhost:3001/api/producto/actualizar/1](http://localhost:3001/api/producto/actualizar/1)          |
| `DELETE` | `/api/producto/eliminar/:id`     | Elimina un producto        | [http://localhost:3001/api/producto/eliminar/1](http://localhost:3001/api/producto/eliminar/1)              |

---

### 👤 Usuarios

| Método   | Ruta                         | Descripción                   | Enlace                                                                                                                     |
| -------- | ---------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/usuarios/registro`     | Registra un nuevo usuario     | [http://localhost:3001/api/usuarios/registro](http://localhost:3001/api/usuarios/registro)                                 |
| `POST`   | `/api/usuarios/login`        | Inicia sesión                 | [http://localhost:3001/api/usuarios/login](http://localhost:3001/api/usuarios/login)                                       |
| `GET`    | `/api/usuarios/:id`          | Obtiene un usuario por ID     | [http://localhost:3001/api/usuarios/1](http://localhost:3001/api/usuarios/1)                                               |
| `GET`    | `/api/usuarios/email/:email` | Obtiene un usuario por correo | [http://localhost:3001/api/usuarios/email/correo@ejemplo.com](http://localhost:3001/api/usuarios/email/correo@ejemplo.com) |
| `GET`    | `/api/usuarios/`             | Lista todos los usuarios      | [http://localhost:3001/api/usuarios/](http://localhost:3001/api/usuarios/)                                                 |
| `PUT`    | `/api/usuarios/:id`          | Actualiza datos del usuario   | [http://localhost:3001/api/usuarios/1](http://localhost:3001/api/usuarios/1)                                               |
| `DELETE` | `/api/usuarios/:id`          | Elimina un usuario            | [http://localhost:3001/api/usuarios/1](http://localhost:3001/api/usuarios/1)                                               |

---

