import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListPage from './pages/users/UserListPage';
import UserFormInsertPage from './pages/users/UserFormInsertPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserListPage />} />
        {/* <Route path="/users/:id/edit" element={<UserFormEditPage />} />  No implementado */}
        <Route path="/users/new" element={<UserFormInsertPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;