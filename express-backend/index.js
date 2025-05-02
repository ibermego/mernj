// USERS versión final con usersRouter y usando el directorio routes, osea enrutamiento avanzado
import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
// import PouchDB from 'pouchdb';
import usersRouter from './routes/users.js';
import carsRouter from './routes/cars.js';
import descriptionsRouter from './routes/descriptions.js';
import loginRouter from './routes/login.js';

import { logger } from "./middleware/logger.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const HOSTNAME = "127.0.0.1"

// Middleware

// cors() permite el acceso entre dominios (Cross-Origin Resource Sharing).
// Esto es necesario cuando tienes React y Express en distintos orígenes (por ejemplo, React en localhost:3000 y Express en localhost:5000).
// Sin esto, el navegador bloquearía las peticiones por razones de seguridad.
app.use(cors()); // para tener acceso desde React, ya que React y Express no están en el mismo directorio
// Habilita el parsing de JSON en los requests.
// Es decir, cuando un cliente (como React) envía datos en formato JSON (por ejemplo, en un POST o PUT), Express puede leerlos desde req.body.
app.use(express.json());
app.use(logger); // adding middleware to show some logs
// Esto registra routers separados para manejar distintas partes del backend:
// /api/v1/users → controlado por usersRouter
// /api/v1/cars → controlado por carsRouter
// /api/v1/descriptions → controlado por descriptionsRouter
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/cars', carsRouter)
app.use('/api/v1/descriptions', descriptionsRouter)
app.use('/api/v1/login', loginRouter)

// Start Server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on http://localhost:${PORT} IP:${HOSTNAME}`);
});