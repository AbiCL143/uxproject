import './App.css';
import 'animate.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Rutas
import LandingPage from './pages/lading_page';
import Login from './pages/login';
import Registrer from './pages/registrer';
import HomePage from './pages/home_page';
import Rubricas from './pages/rubricas';
import Registro_software from './pages/registro_software';
import Software from './pages/softwares';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registrer' element={<Registrer/>} />
      <Route path='/home' element={<HomePage/>} />
      <Route path='/rubricas' element={<Rubricas/>}/>
      <Route path='/registro_software' element={<Registro_software/>}/>
      <Route path='/software' element={<Software/>}/>
      </Routes>
    </Router>
  );
}

export default App;
