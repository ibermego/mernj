import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

// datos para una tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// fin datos tabla
// para dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// fin dialog

const CarsListComponent = () => {
  const [cars, setCars] = useState([]); // Set initial state to an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [closeViewDialog, setCloseViewDialog] = useState(true)
  const [selectedCar, setSelectedCar] = useState({})
  const [carToDelete, setCarToDelete] = useState({})
  const [selectedActionMessage, setSelectedActionMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to fetch the cars
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/cars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data); // Set the cars to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchCars(); // Call the async function
  }, []); // Empty dependency array, so it runs once when the component mounts

  const goToViewCar = (id) => {
    navigate(`/cars/view/${id}`);
  }
  const goToEditCar = (id) => {
    navigate(`/cars/edit/${id}`);
  }

const handleDialog = async (id) => {
    setOpenViewDialog(true)
    try {
      const response = await fetch(`http://localhost:5000/api/v1/cars/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCarToDelete(data); // Set the cars to delete
    } catch (error) {
      setError(error.message); // Handle errors
    } finally {
      setLoading(false); // Set loading to false once data is fetched or error occurs
    }

}
const handleDelete = (id) => {
    let resultado = ""
    fetch(`http://localhost:5000/api/v1/cars/${id}`,
        {method: "delete"})
    .then(response => response.json())
    .then(data => {
        resultado = data
        if (resultado) {
            console.log("coche borrado:", resultado)
        }
    })

    setOpenViewDialog(false)
    setCars(cars => {
        let tempCars = [...cars]
        tempCars = tempCars.filter(car => car._id !== id)
        return tempCars
    })
}
    

  // Render loading, error, or the list of cars
    return (
        <div>
          <h1>Cars Branches:</h1>
          <Dialog
              open={openViewDialog}
              onClose={()=> setOpenViewDialog(false)}
              aria-labelledby="viewCar-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="viewCar-dialog-title">
                  <h2>Delete Car?</h2>
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Id: {carToDelete._id}<br />
                      Marca: {carToDelete.marca}<br />
                      Modelo: {carToDelete.modelo}<br />
                      Año fabricación: {carToDelete.ano}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  {/* <Button onClick={()=> setOpenViewDialog(false)}>Disagree</Button> */}
                  <Button onClick={()=> handleDelete(carToDelete._id)} autoFocus>
                      Delete
                  </Button>
                  <Button onClick={()=> setOpenViewDialog(false)} autoFocus>
                      Cancel
                  </Button>
              </DialogActions>
          </Dialog>

          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                {/* <TableCell>Marca</TableCell> */}
                <TableCell align="right" sx={{fontSize: "20px"}}>Branch</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Model</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Year&nbsp;(?)</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {cars.map((coche, index) => (
                    <TableRow
                    key={index}
                    //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="right">
                            {coche.marca}
                        </TableCell>
                        <TableCell align="right">{coche.modelo}</TableCell>
                        <TableCell align="right">{coche.ano}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup variant="contained" aria-label="Basic button group">
                              <Button onClick={()=> goToViewCar(coche._id)}>
                                🔎View
                              </Button>
                              {/* <Button onClick={handleNew} sx={{ backgroundColor: "green", color: "white" }}>
                                ➕Add
                              </Button> */}
                              <Button onClick={()=> goToEditCar(coche._id)} sx={{ backgroundColor: "green", color: "white" }}>
                                ✏️Modify
                              </Button>
                              <Button onClick={()=> handleDialog(coche._id)} sx={{ backgroundColor: "blue", color: "white" }}>
                                ❌Delete
                              </Button>
                          </ButtonGroup>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
};

export default CarsListComponent;