import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


// https://jsonplaceholder.typicode.com/

const CochesSummary = () => {

    const [cuenta, setCuenta] = useState(0)
    const [antiguo, setAntiguo] = useState({})
    const [nuevo, setNuevo] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        const summary = async (summaryType) => {
            try {
                setIsLoading(true)
                // const response = await fetch('http://localhost:5000/api/v1/cars?summary=count');
                const response = await fetch(`http://localhost:5000/api/v1/cars?summary=${summaryType}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // setCuenta(data.resultado)
                switch (summaryType) {
                    case "count":
                        setCuenta(data.resultado)
                        break
                    case "older":
                        setAntiguo(data.resultado)
                        break
                    case "newer":
                        setNuevo(data.resultado)
                        break
                    default:
                        console.log("Error in sumamry Type, joerr....")
                }
                console.log("imprimo data: ", data)
                
            }
            catch (error) {
                // setError(error.message); // Handle errors
            }
            finally {
                setIsLoading(false); // Set loading to false once data is fetched or error occurs
            }
        }
        // calling function
        summary("count")
        summary("older")
        summary("newer")
        // fetch('http://localhost:5000/api/v1/cars?summary=count')
        // .then(response=> response.json())
        // .then(data => setCuenta(data))
    
    }, [])


    return (
        <>
            {/* poniendo un icono de carga */}
            {isLoading && <CircularProgress />}
            <Box sx={{display: "flex"}}>
                {/* <Card sx={{ minWidth: 275 }}> */}
                <Card sx={{width: "400px", margin: "10px", backgroundColor: 'beige'}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Base de datos Coches
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Cuenta de Coches
                        </Typography>
                        <Typography variant="body2" sx={{color: "red"}}>
                            {cuenta} registros <br/>
                            Componente para usar la api <br/>
                            http://localhost:5000/api/v1/cars?summary=count
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Cerrar</Button>
                    </CardActions>
                </Card>
                <Card sx={{width: "400px", margin: "10px", backgroundColor: 'beige'}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Base de datos Coches
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Coche más antiguo
                        </Typography>
                        <Typography variant="body2" sx={{color: "red"}}>
                            {antiguo.marca} {antiguo.modelo} {antiguo.ano} <br />
                            Componente para usar la api <br/>
                            http://localhost:5000/api/v1/cars?summary=older
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Cerrar</Button>
                    </CardActions>
                </Card>
                <Card sx={{width: "400px", margin: "10px", backgroundColor: 'beige'}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Base de datos Coches
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Coche más nuevo
                        </Typography>
                        <Typography variant="body2" sx={{color: "red"}}>
                            {nuevo.marca} {nuevo.modelo} {nuevo.ano} <br />
                            Componente para usar la api <br/>
                            http://localhost:5000/api/v1/cars?summary=newer
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Cerrar</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}
export default CochesSummary;