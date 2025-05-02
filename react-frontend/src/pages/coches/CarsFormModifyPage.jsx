import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

function CarsFormModifyPage() {
    const [error, setError] = useState('')
    // const [setLoading] = false
    const [selectedCar, setSelectedCar] = useState({})
    const [idCoche, setIdCoche] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [ano, setAno] = useState('')

    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchCar = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/cars/${id}`);
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("imprimo data: ", data)
                setSelectedCar(data)
                console.log("imprimo selectedCar: ", selectedCar)
                setIdCoche(data._id)
                setMarca(data.marca)
                setModelo(data.modelo)
                setAno(data.ano)

            } catch (error) {
                setError(error.message); // Handle errors
            } finally {
                // setLoading(false); // Set loading to false once data is fetched or error occurs
            }
        }
        fetchCar()
    }, [])


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
      const response = await fetch(`http://localhost:5000/api/v1/cars/${idCoche}`,
        {
          method: 'PUT',
          headers: {'Content-type': 'application/json; charset=UTF-8'},
          body: JSON.stringify(coche)

        }
      );

    //   setMarca("")
    //   setModelo("")
    //   setAno("")
    navigate("/cars");
    console.log("Mandar fetch")
}



  return (
    <div>
      <h2>Welcome User Form Modify Peich</h2>

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

        <TextField id="marca" value={marca} label="Branch" variant="outlined" onChange={(e)=> setMarca(e.target.value)}/>
        <TextField id="modelo" value={modelo} label="Model" variant="outlined" onChange={(e)=> setModelo(e.target.value)}/>
        <TextField id="ano" value={ano} label="Year" variant="filled" onChange={(e)=> setAno(e.target.value)}/>

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
export default CarsFormModifyPage;