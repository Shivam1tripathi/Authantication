
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import Forgetpassword from './pages/Forgetpassword';
import EditProfile from './pages/EditProfile';


function App() {
  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forget-password' element={<Forgetpassword/>}/>
    <Route path='/edit-profile' element={<EditProfile/>}/>
  </Routes>
  );
}

export default App;
