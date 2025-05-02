import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CarsSelector = () => {
    const [age, setAge] = useState('')
    const [selectedCars, setSelectedCars] = useState([])
    const [year, setYear] = useState('');
    const [idCoche, setIdCoche] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [ano, setAno] = useState('')
    const [error, setError] = useState('')
    

    const handleChange = async (e) => {
      e.preventDefault()
      setAge(e.target.value)
      if (e.target.value === '') {
        setSelectedCars([])
        return
      }
      try {
        // http://localhost:5000/api/v1/cars/search?ano=1990
          const response = await fetch(`http://localhost:5000/api/v1/cars/search?ano=${e.target.value}`);
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("imprimo data: ", data)
          let temp = [...data].sort((firstItem, secondItem) => firstItem.ano - secondItem.ano)
          setSelectedCars(temp)

      } catch (error) {
          setError(error.message); // Handle errors
      } finally {
          // setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    }
    return (
      <>
        <Box sx={{ width: 120, margin: "20px"}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Initial Year</InputLabel>
            <Select
              labelId="Selecciona año mínimo"
              id="demo-simple-select"
              value={age}
              label="Initial Year"
              onChange={(e)=>handleChange(e)}
            >
              <MenuItem value={''}>empty</MenuItem>
              <MenuItem value={1990}>1990</MenuItem>
              <MenuItem value={1991}>1991</MenuItem>
              <MenuItem value={1992}>1992</MenuItem>
              <MenuItem value={1993}>1993</MenuItem>
              <MenuItem value={1994}>1994</MenuItem>
              <MenuItem value={1995}>1995</MenuItem>
              <MenuItem value={1996}>1996</MenuItem>
              <MenuItem value={1997}>1997</MenuItem>
            </Select>
          </FormControl>
          {/* crear componente y usar un map */}

        </Box>
          {selectedCars.map((car, index) => (
            <div key={car._id || index}>
                <p>
                * {car.marca} - {car.modelo} - {car.ano}
                </p>
            </div>
          ))}
    </>     
  )
}



export default CarsSelector;
