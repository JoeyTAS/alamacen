CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  dni VARCHAR(8) NOT NULL,
  nombres VARCHAR(100),
  apellidos VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  contraseña TEXT,
  rol VARCHAR(20) CHECK (rol IN ('empleado', 'cliente')),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  precio NUMERIC(10, 2),
  categoria VARCHAR(20) CHECK (categoria IN ('inalambrico', 'electrico', 'manual')),
  stock INT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compras (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historial_compras (
  id SERIAL PRIMARY KEY,
  compra_id INT REFERENCES compras(id),
  producto_id INT REFERENCES productos(id),
  cantidad INT,
  precio_unitario NUMERIC(10, 2)
);

INSERT INTO usuarios (dni, nombres, apellidos, email, contraseña, rol)
VALUES 
('12345678', 'Juan', 'Pérez', 'juan.perez@example.com', 'password123', 'cliente'),
('23456789', 'Ana', 'Gómez', 'ana.gomez@example.com', 'password456', 'empleado');


INSERT INTO productos (nombre, descripcion, precio, categoria, stock)
VALUES 
('Ratón inalámbrico', 'Ratón óptico inalámbrico', 29.99, 'inalambrico', 100),
('Taladro eléctrico', 'Taladro con cable y varias velocidades', 99.99, 'electrico', 50),
('Destornillador manual', 'Destornillador de acero inoxidable', 9.99, 'manual', 200);


INSERT INTO compras (usuario_id, fecha)
VALUES 
(1, CURRENT_TIMESTAMP), 
(2, CURRENT_TIMESTAMP);


INSERT INTO historial_compras (compra_id, producto_id, cantidad, precio_unitario)
VALUES 
(1, 1, 2, 29.99),  -- Compra de 2 Ratones inalámbricos
(1, 2, 1, 99.99),  -- Compra de 1 Taladro eléctrico
(2, 3, 5, 9.99);   -- Compra de 5 Destornilladores manuales
SELECT * FROM usuarios;
