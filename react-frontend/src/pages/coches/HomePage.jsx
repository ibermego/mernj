import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function HomePage() {

    const navigate = useNavigate();

    const goToCars = () => {
        navigate("/descriptions");
    }

  return (
    <div>
      <h2>Welcome JOM Peich</h2>

      <Button variant="contained" color="primary" onClick={goToCars}>
        Go to Cars
      </Button>
    </div>
  );
}
export default HomePage;