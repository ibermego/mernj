// COCHES
import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware

// para configurar cors
const corsOptions = { 
    origin: "http://localhost:3000",
    // methods:["POST"] // sin esta línea se deja todos los methods
}

// app.use(cors(corsOptions)); // para tener acceso desde React, ya que React y Express no están en el mismo directorio
app.use(cors())
app.use(express.json());

let coches = [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2020 },
    { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2021 },
    { id: 3, marca: 'Ford', modelo: 'Fusion', ano: 2019 }
  ];

app.get('/api/v1/coches', (req, res) => {
    res.json(coches)
})

app.get('/api/v1/coches/:id', (req, res) => {
    const {id} = req.params
    const coche = coches.find(coche => coche.id == id)
    res.json(coche)
})

app.post('/api/v1/coches', (req, res) => {
    const {id, marca, modelo, ano} = req.body
    const coche = {
        id: id,
        marca: marca,
        modelo: modelo,
        ano: ano
    }
    coches.push(coche)
    console.log(coches)
    res.json(coche)
})

app.delete('/api/v1/coches/:id', (req, res) => {
    console.log(coches)
    const {id} = req.params
    const index = coches.findIndex(coche => coche.id == id)
    console.log("indice: ", index)
    const cocheBorrado = coches[index]
    coches.splice(index, 1)
    console.log(coches)
    res.json(cocheBorrado)
})



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});