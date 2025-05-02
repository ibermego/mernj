import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField, Typography } from '@mui/material';

function DescriptionsFormEditPage() {
    const [picture, setPicture] = useState(Math.floor(Math.random() * 7))
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date().toUTCString())

    console.log("imagen nº: ", picture)
    const navigate = useNavigate();

    const goToHome = () => {
      navigate("/descriptions");
    }
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // crear user con datos de inputs
    const descriptionItem = {
        picture: picture,
        description: description,
        name: name,
        date: date
    }

      // fetch POST y pasar user como cuerpo (body)
    const response = await fetch('http://localhost:5000/api/v1/descriptions',
      {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(descriptionItem)
      }
    );
    navigate(`/descriptions`);  
    console.log("Mandar fetch")
  }

  const handleChangePicture = () => {
    setPicture(Math.floor(Math.random() * 7))
  }

  return (
    <div>
      <h1>Welcome to Descriptions</h1>
      <Typography component="p">
        Pls describe the image bellow with your own words
      </Typography>
      <Box component="div" sx={{display: "flex", alignItems: "center"}}>

        <Box
          sx={{
            // width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "20px"
          }}
        >
          <Box component="img" sx={{width: "600px"}}
          src={`../../assets/${picture}.jpg`}
          />
            {/* <Typography>Picture can be changed randomly by pressing F5</Typography> */}
            <Button type="button" onClick={handleChangePicture} variant="contained" color="primary"
              sx={{margin: "0px 0px 40px 20px", width: "30%", textAlign: "center"}}
            >
                  Change picture
            </Button>
          </Box>
        {/* UN BOX QUE ACTUA COMO UN FORMULARIO */}
        <Box  component="form" onSubmit={handleFormSubmit} sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
          >

            {/* <TextField id="picture" label="Picture" variant="outlined" onChange={(e)=> setPicture(e.target.value)} /> */}
            <TextField id="name" label="Student's name ..." variant="filled" onChange={(e)=> setName(e.target.value)} required/>
            <TextField id="description" label="Describe the image..." variant="outlined" multiline rows={5}
            onChange={(e)=> setDescription(e.target.value)} required
            />
            {/* <TextField value={date} id="date" variant="filled" onChange={(e)=> setDate(e.target.value)} disabled={true}/> */}

            <Box sx={{display: "flex", gap: "20px", justifyContent: "center"}}>
            {/* <Button type="submit" onClick={handleFormSubmit} variant="contained" color="primary"> */}
            <Button type="submit"variant="contained" color="primary">
            Save
                </Button>
                <Button type="button" onClick={()=> navigate('/descriptions')} variant="contained" color="primary">
                  Cancel
                </Button>
            </Box>
          </Box>
      </Box>
    </div>
  );
}
export default DescriptionsFormEditPage;