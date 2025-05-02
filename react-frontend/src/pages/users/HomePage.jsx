import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function HomePage() {

    const navigate = useNavigate();

    const goToUsers = () => {
        navigate("/users");
    }

  return (
    <div>
      <h2>Welcome JOM Peich</h2>


      <Button variant="contained" color="primary" onClick={goToUsers}>
        Go to Users
      </Button>
    </div>
  );
}
export default HomePage;