import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function HomePage() {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
    const navigate = useNavigate();

    const goToCars = () => {
        navigate("/descriptions");
    }

  return (
    <div>
      <h2>{t('welcome_message')}</h2>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>

      <Button variant="contained" color="primary" onClick={goToCars}>
        {t('home_button1')}
      </Button>
{/* <h2>Welcome JOM Peich</h2>

<Button variant="contained" color="primary" onClick={goToCars}>
  Go to Descriptions
</Button> */}
</div>
  );
}
export default HomePage;