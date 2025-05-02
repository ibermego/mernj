import React, { useEffect, useState } from 'react';
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


// https://jsonplaceholder.typicode.com/

const Coches = () => {

    const [datosCoches, setDatosCoches] = useState([])
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [closeViewDialog, setCloseViewDialog] = useState(true)
    const [selectedCar, setSelectedCar] = useState({})
    const [selectedActionMessage, setSelectedActionMessage] = useState("")


    useEffect(()=> {
        fetch('http://localhost:5000/api/v1/coches')
            .then(response=> response.json())
            .then(data => setDatosCoches(data))
        
    }, [])

    const handleView = (id) => {
        let resultado = ""
        fetch(`http://localhost:5000/api/v1/coches/${id}`,
            {method: "get"})
        .then(response => response.json())
        .then(data => {
            resultado = data
            if (resultado) {
                console.log("coche seleccionado:", resultado)
                setSelectedCar(data)
                setOpenViewDialog(true)
                setSelectedActionMessage("View Car Data")
            }
        })
    }

    const handleDelete = (id) => {
        let resultado = ""
        fetch(`http://localhost:5000/api/v1/coches/${id}`,
            {method: "delete"})
        .then(response => response.json())
        .then(data => {
            resultado = data
            if (resultado) {
                console.log("coche borrado:", resultado)
                setSelectedActionMessage("Delete Car")

            }
        })
    }

    return (
        <>
            <Typography variant="h1" sx={{backgroundColor: "blue"}}>COCHES</Typography>

{/* Dialog View */}
            <Dialog
                open={openViewDialog}
                onClose={()=> setOpenViewDialog(false)}
                aria-labelledby="viewCar-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="viewCar-dialog-title">
                    {selectedActionMessage}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Id: {selectedCar.id}<br />
                        Marca: {selectedCar.marca}<br />
                        Año fabricación: {selectedCar.ano}
                        {/* Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running. */}

                        {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            View car details
                        </Typography> */}
                        {/* <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography> */}
                        {/* <Typography variant="h5">
                            View car details
                        </Typography> */}
                        {/* <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography> */}
                        {/* <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography> */}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={()=> setOpenViewDialog(false)}>Disagree</Button> */}
                    <Button onClick={()=> setOpenViewDialog(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        

            {/* <TableContainer component={Paper}> */}
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Marca</TableCell>
                        <TableCell align="right">Modelo</TableCell>
                        <TableCell align="right">Año&nbsp;(?)</TableCell>
                        <TableCell align="right">Acción</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {datosCoches.map((coche) => (
                            <TableRow
                            key={coche.id}
                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {coche.marca}
                                </TableCell>
                                <TableCell align="right">{coche.modelo}</TableCell>
                                <TableCell align="right">{coche.ano}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button onClick={()=> handleView(coche.id)}>🔎View</Button>
                                    <Button sx={{ backgroundColor: "green", color: "white" }}>➕Add
                                        <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
                                    </Button>
                                    <Button sx={{ backgroundColor: "green", color: "white" }}>✏️Modify</Button>
                                    <Button onClick={()=> handleDelete(coche.id)} sx={{ backgroundColor: "blue", color: "white" }}>❌Delete</Button>
                                </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            {/* </TableContainer> */}

        </>
    )
}
export default Coches;