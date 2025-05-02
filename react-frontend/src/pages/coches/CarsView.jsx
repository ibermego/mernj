import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
// para dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// fin dialog

function CarsView() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [openViewDialog, setOpenViewDialog] = useState(true);
  const [selectedCar, setSelectedCar] = useState({})
  const [selectedActionMessage, setSelectedActionMessage] = useState("")

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
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    }
    fetchCar()
  }, [])

  const handleHome = () => {
    // ()=> setOpenViewDialog(false)
    navigate(`/cars/new`);
  }

  return (
    <div>
      <h2>Welcome Cars View</h2>

      <Dialog
          open={openViewDialog}
          onClose={()=> setOpenViewDialog(false)}
          aria-labelledby="viewCar-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="viewCar-dialog-title">
              {selectedActionMessage} <h2>Car details</h2>
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Id: {selectedCar._id}<br />
                  Marca: {selectedCar.marca}<br />
                  Año fabricación: {selectedCar.ano}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              {/* <Button onClick={()=> setOpenViewDialog(false)}>Disagree</Button> */}
              <Button onClick={()=> navigate('/cars')} autoFocus>
                  Close
              </Button>
          </DialogActions>
      </Dialog>

    </div>
  );
}
export default CarsView;