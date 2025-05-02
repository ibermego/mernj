import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
// para dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// fin dialog

function DescriptionsView() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [openViewDialog, setOpenViewDialog] = useState(true);
  const [selectedDescription, setSelectedDescriptions] = useState({})
  const [selectedActionMessage, setSelectedActionMessage] = useState("")

  const {id} = useParams()
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/descriptions/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("imprimo data: ", data)
        setSelectedDescriptions(data)
        console.log("imprimo selectedDescription: ", selectedDescription)
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    }
    fetchCar()
  }, [])

  const handleHome = () => {
    navigate(`/descriptions`);
  }

  return (
    <div>
      <h2>Welcome Descriptions View</h2>
        <Button variant="contained" color="primary" onClick={handleHome} autoFocus
            sx={{margin: "10px"}}
        >
            Close
        </Button>
      <Dialog
          open={openViewDialog}
          onClose={()=> setOpenViewDialog(false)}
          aria-labelledby="viewCar-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="viewCar-dialog-title">
              {selectedActionMessage} <h2>Description details</h2>
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                  <Box component="img"
                    src={`../../../assets/${selectedDescription.picture}.jpg`} sx={{with: "350px", height: "350px"}} 
                  />
                  <Typography>
                    Student Name: {selectedDescription.name}
                  </Typography>
                  <Typography>
                    Descripcion: {selectedDescription.description}
                  </Typography>
                  {/* Id: {selectedDescription._id}<br />
                  Marca: {selectedDescription.marca}<br />
                  Año fabricación: {selectedDescription.ano} */}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              {/* <Button onClick={()=> setOpenViewDialog(false)}>Disagree</Button> */}
              <Button onClick={()=> navigate('/descriptions')} autoFocus>
                  Close
              </Button>
          </DialogActions>
      </Dialog>

    </div>
  );
}
export default DescriptionsView;