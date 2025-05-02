import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';

function CarsFormInsertPage() {
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [ano, setAno] = useState('')


    const navigate = useNavigate();

    const goToHome = () => {
      navigate("/");
    }
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // crear user con datos de inputs
    const coche = {
        marca: marca,
        modelo: modelo,
        ano: ano
    }

      // fetch POST y pasar user como cuerpo (body)
      const response = await fetch('http://localhost:5000/api/v1/cars',
        {
          method: 'POST',
          headers: {'Content-type': 'application/json; charset=UTF-8'},
          body: JSON.stringify(coche)

        }
      );
    navigate(`/cars`);  
    console.log("Mandar fetch")
  }



  return (
    <div>
      <h2>Welcome Cars Form Insert Peich</h2>

      {/* UN BOX QUE ACTUA COMO UN FORMULARIO */}
      <Box component="form" onSubmit={handleFormSubmit}
        sx={{
            width: 300,
            height: 300,
            borderRadius: 1,
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            gap: 4,
            p: 2
        }}
      >

        <TextField id="marca" label="Branch" variant="outlined" onChange={(e)=> setMarca(e.target.value)}/>
        <TextField id="modelo" label="Model" variant="outlined" onChange={(e)=> setModelo(e.target.value)}/>
        <TextField id="ano" label="Year" variant="filled" onChange={(e)=> setAno(e.target.value)}/>

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>



      </Box>

      <Button variant="contained" color="primary" onClick={goToHome}>
        Home
      </Button>
    </div>
  );
}
export default CarsFormInsertPage;