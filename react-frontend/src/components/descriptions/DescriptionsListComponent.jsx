import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
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

const DescriptionsListComponent = () => {
  const [descriptions, setDescriptions] = useState([]); // Set initial state to an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [closeViewDialog, setCloseViewDialog] = useState(true)
  const [descriptionToDelete, setDescriptionToDelete] = useState({})
  const [selectedActionMessage, setSelectedActionMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to fetch the descriptions
    const fetchDescriptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/descriptions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.sort((firstItem, secondItem) => new Date(firstItem.date) - new Date(secondItem.date))
        setDescriptions(data); // Set the descriptions to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchDescriptions(); // Call the async function
  }, []); // Empty dependency array, so it runs once when the component mounts

  const goToViewDescription = (id) => {
    navigate(`/descriptions/view/${id}`);
  }
  const goToEditDescription = (id) => {
    navigate(`/descriptions/edit/${id}`);
  }
  const goToIA = (id) => {
    navigate(`/descriptions/view/${id}/ia`);
  }

const handleDialog = async (id) => {
    setOpenViewDialog(true)
    try {
      const response = await fetch(`http://localhost:5000/api/v1/descriptions/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDescriptionToDelete(data); // Set the descriptions to delete
    } catch (error) {
      setError(error.message); // Handle errors
    } finally {
      setLoading(false); // Set loading to false once data is fetched or error occurs
    }

}
const handleDelete = (id) => {
    let resultado = ""
    fetch(`http://localhost:5000/api/v1/descriptions/${id}`,
        {method: "delete"})
    .then(response => response.json())
    .then(data => {
        resultado = data
        if (resultado) {
            console.log("description borrado:", resultado)
        }
    })

    setOpenViewDialog(false)
    setDescriptions(descriptions => {
        let tempdescriptions = [...descriptions]
        tempdescriptions = tempdescriptions.filter(description => description._id !== id)
        return tempdescriptions
    })
}
    

  // Render loading, error, or the list of descriptions
    return (
        <div>
          <h2>Descriptions:</h2>
          <Dialog
              open={openViewDialog}
              onClose={()=> setOpenViewDialog(false)}
              aria-labelledby="viewDescription-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="viewDescription-dialog-title">
                  <h2>Delete Description?</h2>
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      {/* Image: {descriptionToDelete.picture} */}
                      <Box component="img"
                        src={`../../../assets/${descriptionToDelete.picture}.jpg`} sx={{with: "350px", height: "350px"}} 
                      /><br />
                      Student's name: {descriptionToDelete.name}<br />
                      Description: {descriptionToDelete.description}<br />
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  {/* <Button onClick={()=> setOpenViewDialog(false)}>Disagree</Button> */}
                  <Button onClick={()=> handleDelete(descriptionToDelete._id)} 
                    variant="contained" autoFocus sx={{backgroundColor: "red"}}
                  >
                      Delete
                  </Button>
                  <Button onClick={()=> setOpenViewDialog(false)} autoFocus variant="contained"
                  >
                      Cancel
                  </Button>
              </DialogActions>
          </Dialog>

          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                {/* <TableCell>Marca</TableCell> */}
                <TableCell align="right" sx={{fontSize: "20px"}}>Image</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Image description</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Name</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Date</TableCell>
                <TableCell align="right" sx={{fontSize: "20px"}}>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {descriptions.map((description, index) => (
                    <TableRow
                    key={index}
                    //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="right">
                          <Box component="img"
                            src={`../../../assets/${description.picture}.jpg`} 
                            sx={{with: "80px", height: "80px", transition: "all 1s", boxShadow: "10px 10px 10px 5px",
                                    "&:hover": {
                                        transform: "scale(2.5)",
                                        cursor: "pointer",
                                    }
                            ,}} 
                          />
                          {/* {description.picture} */}
                        </TableCell>
                        <TableCell align="right">{description.description}</TableCell>
                        <TableCell align="right">{description.name}</TableCell>
                        <TableCell align="right">{description.date}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup variant="contained" aria-label="Basic button group">
                              <Button title="View" onClick={()=> goToViewDescription(description._id)}
                                sx={{ backgroundColor: "green", color: "white", fontSize: "20px"}}>
                                🔎
                                {/* View */}
                              </Button>
                              {/* <Button onClick={handleNew} sx={{ backgroundColor: "green", color: "white" }}>
                                ➕Add
                              </Button> */}
                              <Button title="Modify" onClick={()=> goToEditDescription(description._id)} 
                                sx={{ backgroundColor: "green", color: "white", fontSize: "20px"}}>
                                ✏️
                                {/* Modify */}
                              </Button>
                              <Button title="Delete" onClick={()=> handleDialog(description._id)} 
                                sx={{ backgroundColor: "blue", color: "white", fontSize: "20px"}}>
                                ❌
                                {/* Delete */}
                              </Button>
                              <Button title="IA" onClick={()=> goToIA(description._id)} 
                                sx={{ backgroundColor: "blue", color: "white", fontSize: "20px"}}>
                                🤖
                                {/* Delete */}
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

export default DescriptionsListComponent;