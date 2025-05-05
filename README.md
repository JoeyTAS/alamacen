## 🌐 Endpoints de la API

### 🧑‍🤝‍🧑 Compras

| Método | Ruta                         | Descripción                              | Link                                                        |
|--------|-------------------------------|------------------------------------------|-------------------------------------------------------------|
| `POST` | `/compras`                     | Realiza una compra                       | [http://localhost:3001/compras](http://localhost:3001/compras) |
| `GET`  | `/compras`                     | Lista todas las compras                  | [http://localhost:3001/compras](http://localhost:3001/compras) |
| `GET`  | `/compras/usuario/:id`         | Obtiene el historial de compras de un usuario | [http://localhost:3001/compras/usuario/1](http://localhost:3001/compras/usuario/1) |

### 📜 Historial de Compras

| Método | Ruta                         | Descripción                              | Link                                                        |
|--------|-------------------------------|------------------------------------------|-------------------------------------------------------------|
| `POST` | `/`                            | Registra un producto en una compra       | [http://localhost:3001/](http://localhost:3001/)             |
| `GET`  | `/compra/:compra_id`          | Obtiene el historial por ID de compra    | [http://localhost:3001/compra/1](http://localhost:3001/compra/1) |
| `GET`  | `/usuario/:usuario_id`        | Obtiene el historial de compras por ID de usuario | [http://localhost:3001/usuario/1](http://localhost:3001/usuario/1) |

### 📦 Productos

| Método | Ruta                          | Descripción                             | Link                                                        |
|--------|--------------------------------|-----------------------------------------|-------------------------------------------------------------|
| `POST` | `/productos`                   | Crea un nuevo producto                  | [http://localhost:3001/productos](http://localhost:3001/productos) |
| `GET`  | `/productos`                   | Lista todos los productos               | [http://localhost:3001/productos](http://localhost:3001/productos) |
| `GET`  | `/productos/:id`               | Obtiene un producto por ID              | [http://localhost:3001/productos/1](http://localhost:3001/productos/1) |
| `PUT`  | `/productos/:id`               | Actualiza un producto por ID            | [http://localhost:3001/productos/1](http://localhost:3001/productos/1) |
| `DELETE` | `/productos/:id`             | Elimina un producto por ID              | [http://localhost:3001/productos/1](http://localhost:3001/productos/1) |

### 🧑‍💼 Usuarios

| Método | Ruta                            | Descripción                              | Link                                                        |
|--------|----------------------------------|------------------------------------------|-------------------------------------------------------------|
| `POST` | `/registro`                      | Registra un nuevo usuario                | [http://localhost:3001/registro](http://localhost:3001/registro) |
| `POST` | `/login`                         | Inicia sesión (autenticación)            | [http://localhost:3001/login](http://localhost:3001/login) |
| `GET`  | `/:id`                           | Obtiene un usuario por su ID             | [http://localhost:3001/1](http://localhost:3001/1) |
| `GET`  | `/email/:email`                  | Obtiene un usuario por su correo electrónico | [http://localhost:3001/email/usuario@example.com](http://localhost:3001/email/usuario@example.com) |
| `GET`  | `/`                              | Lista todos los usuarios                 | [http://localhost:3001/](http://localhost:3001/) |
| `DELETE` | `/:id`                          | Elimina un usuario por su ID             | [http://localhost:3001/1](http://localhost:3001/1) |
| `PUT`  | `/:id`                           | Actualiza los detalles de un usuario     | [http://localhost:3001/1](http://localhost:3001/1) |
