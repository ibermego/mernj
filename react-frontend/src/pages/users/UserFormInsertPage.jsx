import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';

function UserFormInsertPage() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')


    const navigate = useNavigate();

    const goToHome = () => {
      navigate("/");
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // crear user con datos de inputs
    const user = {
      nombre: nombre,
      edad: edad
    }

      // fetch POST y pasar user como cuerpo (body)
      const response = await fetch('http://localhost:5000/api/v1/users',
        {
          method: 'POST',
          headers: {'Content-type': 'application/json; charset=UTF-8'},
          body: JSON.stringify(user)

        }
      );


    console.log("Mandar fetch")
}



  return (
    <div>
      <h2>Welcome User Form Insert Peich</h2>

      {/* UN BOX QUE ACTUA COMO UN FORMULARIO */}
      <Box component="form" onSubmit={handleFormSubmit}
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 4,
                  p: 2
                }}
      >

        <TextField id="nombre" label="Nombre" variant="outlined" onChange={(e)=> setNombre(e.target.value)}/>
        <TextField id="edad" label="Edad" variant="filled" onChange={(e)=> setEdad(e.target.value)}/>

        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>



      </Box>

      <Button variant="contained" color="primary" onClick={goToHome}>
        Home
      </Button>
    </div>
  );
}
export default UserFormInsertPage;