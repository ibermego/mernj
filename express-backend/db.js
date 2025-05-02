import path from 'path';                // Módulo nativo de Node.js para manejar rutas de archivos.
import { fileURLToPath } from 'url';    // Convierte una URL de tipo file:// (propia de ES Modules) en una ruta de archivo estándar.
import PouchDB from 'pouchdb';          // Base de datos local (NoSQL, similar a CouchDB).

import pouchdbFind from 'pouchdb-find'  // Plugin de PouchDB que permite hacer consultas tipo MongoDB (por campos).

// Esto reemplaza __filename y __dirname, que no existen por defecto en ES Modules, 
// para saber dónde está ubicado el archivo actual.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a path to the local "data" directory
// Crea una ruta absoluta a una carpeta llamada data dentro del proyecto.
const dataDirectory = path.join(__dirname, 'data');

// Habilita el uso de consultas más avanzadas (como .find()) en la base de datos.
PouchDB.plugin(pouchdbFind)

// Use the prefix config for PouchDB to store data in "data" folder
// Crea o abre una base de datos llamada tienda.
// Los datos se almacenan en disco, en la carpeta data.
const db = new PouchDB(path.join(dataDirectory, 'tienda')); // 'tienda' is your database name

export default db;