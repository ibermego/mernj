import { Router} from 'express';
import db from '../db.js'; // importamos PouchDB
import { validateQuery, validateUserId } from '../middleware/users.js';
import { authenticateToken } from '../middleware/login.js';
import jwt from 'jsonwebtoken';


const router = Router()

const USER = 'user' // reemplazar más adelante 'user' con USER
const JWT_SECRET = '12345';

// router.post('/validate', authenticateToken, async (req, res) => {
//     res.json({
//         validate: true
//     })
// })


// http://localhost:5000/api/v1/users/login/signup con body de username y password
router.post('/signup', async (req, res) => {
    // const { username, password } = req.body;
    const user = req.body
    console.log(user)

    const existe = false
    if (existe) {
        // console.log("correcto")
        // res.json({message: "LOGIN CORRECTO"})
        
        res.json({token: miToken})
        
    } else {
        console.log("creating user")
        try {
            user.type = "login" // crear un usuario, tipo usuario user (como una tabla users)
            console.log(user)
            
            // Insert new user into the database
            const response = await db.post(user);
            console.log("response: ", response)
            
            const miToken = jwt.sign(
                { username: user.username,  },
                JWT_SECRET,
                { expiresIn: '1h' },
                { algorithm: 'HS256' } 
            )
            // return token
            res.json({token: miToken})
        } catch (error) {
            res.status(500).json({ error: 'Failed to add user' });
        }
            
    }

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username == "maria" && password == "password") {
        // console.log("correcto")
        // res.json({message: "LOGIN CORRECTO"})
        const miToken = jwt.sign(
            { username: username.username },
            JWT_SECRET,
            { expiresIn: '1h' },
            { algorithm: 'HS256' } 
        )
        res.json({token: miToken})

    } else {
        console.log("incorrecto")
        res.json({message: "invalid login"})
    }

})

// curl http://localhost:5000/api/v1/login/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDQ5MTEyMTIsImV4cCI6MTc0NDkxNDgxMn0.gSgpWcF9O43rZJVDWf9xjbRsuALGBcJH6jjfvLvmNos"
router.get('/profile', authenticateToken, (req, res) => {
    // req.user is now available
    res.json({
        message: 'Welcome to the protected route!',
        user: req.user
    });
  });

export default router