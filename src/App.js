import './App.css';
import 'animate.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Rutas
import LandingPage from './pages/lading_page';
import Login from './pages/login';
import Registrer from './pages/registrer';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registrer' element={<Registrer/>} />
      </Routes>
    </Router>
  );
}

export default App;
