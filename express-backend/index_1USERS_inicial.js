// USERS versión inicial, usando un array como base de datos
import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // para tener acceso desde React, ya que React y Express no están en el mismo directorio
app.use(express.json());

// API Route Example1
// app.get("/api/message", (req, res) => {
//   res.json({ message: "Hello from Express!" });
// });

// API Route Example2
app.get("/api/v1/message", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  // API Route Example2
app.get("/api/v2/message", (req, res) => {
    res.json({ message: "Hello from Express2!" });
});
// API Route Example2
app.get("/api/v3/productos", (req, res) => {
    res.json({ message: "Hello from Express3!" });
});

const users = [
    {id: 1, nombre: "Pepe", edad: 31},
    {id: 2, nombre: "Pepa", edad: 30},
    {id: 3, nombre: "Manuel", edad: 33},
    {id: 4, nombre: "Manuela", edad: 32},
]
app.get("/api/v1/users", (req, res) => {
    // res.send("Hola desde Users");
    // res.status(200).send("Hola desde Users") // OJO, ESTO ES LO ÚLTIM QUE SE EJECUTA EN ESTA RUTA
    // res.json({
    //     users: "hola"
    // })
    res.json(users)
})

// Creando ruta dinámica
// app.get("/api/v1/users/:id", (req, res) => { 
//     // res.send("Hola desde Users");
//     // res.status(200).send("Hola desde Users") // OJO, ESTO ES LO ÚLTIM QUE SE EJECUTA EN ESTA RUTA
//     // res.json({
//     //     users: "hola"
//     // })
//     const {id, isbn} = req.params;
//     const usuario = users.find(usuario => usuario.id == id)
//     // res.send(`Has seleccionado usuario ${id} con ISBN nr. ${isbn}`);
//     res.json(usuario)
// })
app.get("/api/v1/users/:id", (req, res) => { 
    const {id, isbn} = req.params;
    const usuario = users.find(usuario => usuario.id == id)
    // res.send(`Has seleccionado usuario ${id} con ISBN nr. ${isbn}`);
    if (usuario)
        res.json(usuario)
    else
        res.status(401).json({error: "No existe el usuario"})
})

app.post("/api/v1/users", (req, res) => {
    // conseguir datos de un usuario
    // nos han pasado mediante CURL UN OBJETO: {\"id\": 44, \"nombre\": \"Juanin\", \"edad\": 33}
    const {id, nombre, edad} = req.body;
    // insertar usuario al array users mediante el objeto usuario
    const usuario = {
        id: id,
        nombre: nombre,
        edad: edad
    }
    // añadiendo al array users
    users.push(usuario)
    console.log(users)
    // devolver respuesta de exito
    res.json({message: `Todo correcto. Usuario ${usuario.nombre} creado`, usuario})
})
app.delete("/api/v1/users/:id", (req, res) => {
    console.log(users)
    // conseguir datos de un usuario
    const {id, nombre, edad} = req.params;
    const index = users.findIndex(user => user.id == id)
    users.splice(index, 1)
    // devolver respuesta de exito
    console.log(users)
    res.json({message: `Usuario borrado.`})
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});