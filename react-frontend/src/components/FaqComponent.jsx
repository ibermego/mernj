import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
import {Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography, Button}  from '@mui/material';



function FaqComponent() {
    const [language, setLanguage] = useState("")

    useEffect(()=> {
        const savedLanguage = localStorage.getItem("language")        
        console.log("Language localstorage: ", savedLanguage)
        if (savedLanguage)
            setLanguage(savedLanguage)
        else
            setLanguage(localStorage.setItem("language", "en"))
    
        i18n.changeLanguage(savedLanguage)
    }, [])
    
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang)
  };
  
  const questions = t('faq.questions', {returnObjects: true}) // returnObjects ¿?

  return (
    <div>
      <h2>{t('welcome_message')}</h2>

        {questions.map((item, index) => (
            <li>
                {item.q}
                {item.a}
            </li>
        ))}


    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
        >
            <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
        >
            <Typography component="span">Accordion Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
        </AccordionActions>
    </Accordion>




      <button onClick={() => changeLanguage('en')}>English11</button>
      <button onClick={() => changeLanguage('es')}>Español11</button>


{/* <h2>Welcome JOM Peich</h2>

<Button variant="contained" color="primary" onClick={goToCars}>
  Go to Descriptions
</Button> */}
</div>
  );
}
export default FaqComponent;