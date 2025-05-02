import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/coches/HomePage';
// import UserListPage from './pages/users/UserListPage';
// import UserFormInsertPage from './pages/users/UserFormInsertPage';
import CarsListPage from './pages/coches/CarsListPage';
import CarsFormInsertPage from './pages/coches/CarsFormInsertPage';
import CarsView from './pages/coches/CarsView';
import CarsFormModifyPage from './pages/coches/CarsFormModifyPage';

import HomePage from './pages/descriptions/HomePage';
import DescriptionsListPage from './pages/descriptions/DescriptionsListPage';
import DescriptionsFormInsertPage from './pages/descriptions/DescriptionsFormInsertPage';
import DescriptionsFormEditPage from './pages/descriptions/DescriptionsFormEditPage';
import DescriptionsView from './pages/descriptions/DescriptionsView';
import DescriptionsViewIA from './pages/descriptions/DescriptionsViewIA';
import CarsSelector from './components/CarsSelector';
import CochesSummary from './components/CochesSummary';

import ShoppingCartComponent from './components/shoppingCart/ShoppingCartComponent';
import ShoppingCartComponent2 from './components/shoppingCart/ShoppingCartComponent2';


// http://localhost:5000/api/v1/users?summary=count

function App() {
  return (
    <BrowserRouter>
      <CochesSummary />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/descriptions" element={<DescriptionsListPage />} />
        <Route path="/descriptions/new" element={<DescriptionsFormInsertPage />} />
        <Route path="/descriptions/view/:id" element={<DescriptionsView />} />
        <Route path="/descriptions/view/:id/ia" element={<DescriptionsViewIA />} />
        <Route path="/descriptions/edit/:id" element={<DescriptionsFormEditPage />} />

        <Route path="/cars/selector" element={<CarsSelector />} />

      </Routes>

      <br />
      {/* <ShoppingCartComponent /> */}
      <ShoppingCartComponent2 />
      </BrowserRouter>
  );
}

export default App;