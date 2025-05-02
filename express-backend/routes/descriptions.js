import { Router} from 'express';
import db from '../db.js'; // importamos PouchDB
const router = Router()


router.get('/', async (req, res) => {
    
    try {
        // ANTIGUA FORMA DE BUSCAR
        // Fetch all documents from the 'users_db'
        // const result = await db.allDocs({ include_docs: true });
        // console.log(result);
        // Filter the descriptions if 'type' is used in the document
        // const descriptions = result.rows
        //     .filter(row => row.doc.type === 'descriptions')  // Ensure the document type is 'descriptions'
        //     .map(row => row.doc);  // Map to get the document content

        // NUEVA FORMA DE BUSCAR DATOS
        const selector = {
            type: "descriptions"
        }
        const descriptions = await db.find({
            selector,
            fields: ['_id', '_rev', 'picture', 'name', 'description', 'date'],
            // limit: 10
        })

        // console.log(descriptions)
        console.log(descriptions)
 
        // Send the descriptions as JSON response
        res.json(descriptions.docs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve descriptions' });
    }
});
  
router.get('/:id', async (req, res) => {

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

router.get('/:id/ia', async (req, res) => {

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

router.post('/', async (req, res) => {
    try {
        const description = req.body; // car data from request body
        description.type = "descriptions" // crear un usuario, tipo usuario car (como una tabla descriptions)
        console.log(description)
        
        // Insert new car into the database
        const response = await db.post(description);
        console.log(response)
        
        // Respond with success
        res.status(201).json({ id: response.id, ...description });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add car' });
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const car = await db.get(id)   // cogemos documento (car)
        await db.remove(car)   // borra documento
        res.status(200).json({message: "OK"})

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
});

router.put('/:id', async (req, res) => {
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

export default router;