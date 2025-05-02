// USERS, penúltima versión antes del cambio a rutas avanzadas con la creación de db.js, users.js
import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
import PouchDB from 'pouchdb';
import usersRouter from './routes/users.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Create a database (if it doesn't already exist)
// const db = new PouchDB('users');
const dataDirectory = path.join(__dirname, 'data');  //directorio data, ojo __dirname está arriba

// No parece que funciona bien
PouchDB.defaults({
  prefix: path.join(dataDirectory, path.sep), 
});
const db = new PouchDB(path.join(dataDirectory, 'tienda')); // bbdd tienda

// Middleware
app.use(cors()); // para tener acceso desde React, ya que React y Express no están en el mismo directorio
app.use(express.json());
app.use('/api/v1/users', usersRouters)

//*****************************************
// ********** users start ***************
app.get('/api/v1/users', async (req, res) => {
    try {
        // Fetch all documents from the 'users_db'
        const result = await db.allDocs({ include_docs: true });
        console.log(result);
  
        // Extract user data from the documents
        // const users = result.rows.map(row => row.doc);

        // Filter the users if 'type' is used in the document
        const users = result.rows
            .filter(row => row.doc.type === 'user')  // Ensure the document type is 'user'
            .map(row => row.doc);  // Map to get the document content

        console.log(users)
 
        // Send the users as JSON response
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});
  
app.post('/api/v1/users', async (req, res) => {
    try {
        const user = req.body; // User data from request body
        user.type = "user" // crear un usuario, tipo usuario user (como una tabla users)
        console.log(user)
        
        // Insert new user into the database
        const response = await db.post(user);
        console.log(response)
        
        // Respond with success
        res.status(201).json({ id: response.id, ...user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

app.delete('/api/v1/users/:id', async (req, res) => {

    const {id} = req.params
    try {
        const user = await db.get(id)   // cogemos documento (user)
        await db.remove(user)   // borra documento
        res.status(200).json({message: "OK"})

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.get('/api/v1/users/:id', async (req, res) => {

    const {id} = req.params
    try {
        const car = await db.get(id)   // cogemos documento (user)
        // await db.remove(user)   // borra documento
        res.status(200).json({message: "OK"})

    } catch (error) {
        res.status(500).json({ ...car });
    }
});

app.put('/api/v1/users/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Get the user ID from the URL
        const updatedUser = req.body;  // The updated user data from the request body

        // Fetch the current user data using the ID
        const existingUser = await db.get(id);
        
        // Update the existing user's data with the new data
        const updatedDoc = {
            ...existingUser,
            ...updatedUser, // This will overwrite any matching fields
        };

        // Save the updated document back to the database
        const response = await db.put(updatedDoc);

        // Send back the updated user data
        res.status(200).json({
            id: response.id,
            rev: response.rev,
            ...updatedUser,  // The updated fields from the request
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
// ********** users end ***************
//*****************************************


//*****************************************
// ********** cars start ***************
// curl -X GET localhost:5000/api/v1/cars
// curl -X POST localhost:5000/api/v1/cars -H "Content-Type: application/json" -d "{\"marca\": \"Toyota\", \"ano\": 2028}"
// curl -X DELETE localhost:5000/api/v1/cars/6d9dc351-2385-4e5c-85e0-87bd4ecbbd81 
// curl -X PUT localhost:5000/api/v1/cars/6ea84726-cc95-443d-95ae-d7690c915867 -H "Content-Type: application/json" -d "{\"marca\": \"Toyota2\", \"ano\": 2022}"
app.get('/api/v1/cars', async (req, res) => {
    try {
        // Fetch all documents from the 'users_db'
        const result = await db.allDocs({ include_docs: true });
        console.log(result);
  
        // Extract car data from the documents
        // const cars = result.rows.map(row => row.doc);

        // Filter the cars if 'type' is used in the document
        const cars = result.rows
            .filter(row => row.doc.type === 'car')  // Ensure the document type is 'car'
            .map(row => row.doc);  // Map to get the document content

        console.log(cars)
 
        // Send the cars as JSON response
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cars' });
    }
});
  
app.get('/api/v1/cars/:id', async (req, res) => {

    const {id} = req.params
    console.log(id)
    try {
        const car = await db.get(id)   // cogemos documento (car)
        // await db..remove(user)   // borra documento
        res.status(200).json({ ...car })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to get car' });
    }
});

app.post('/api/v1/cars', async (req, res) => {
    try {
        const car = req.body; // car data from request body
        car.type = "car" // crear un usuario, tipo usuario car (como una tabla cars)
        console.log(car)
        
        // Insert new car into the database
        const response = await db.post(car);
        console.log(response)
        
        // Respond with success
        res.status(201).json({ id: response.id, ...car });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add car' });
    }
});

app.delete('/api/v1/cars/:id', async (req, res) => {

    const {id} = req.params
    try {
        const car = await db.get(id)   // cogemos documento (car)
        await db.remove(car)   // borra documento
        res.status(200).json({message: "OK"})

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
});

app.put('/api/v1/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Get the car ID from the URL
        const updatedCar = req.body;  // The updated car data from the request body

        // Fetch the current car data using the ID
        const existingCar = await db.get(id);
        
        // Update the existing car's data with the new data
        const updatedDoc = {
            ...existingCar,
            ...updatedCar, // This will overwrite any matching fields
        };

        // Save the updated document back to the database
        const response = await db.put(updatedDoc);

        // Send back the updated car data
        res.status(200).json({
            id: response.id,
            rev: response.rev,
            ...updatedCar,  // The updated fields from the request
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
// ********** cars end ***************
//*****************************************



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});