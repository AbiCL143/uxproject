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
import Evaluacion_de_Software from './pages/evaluacion_de_Software';
import NuevaRubrica from './pages/nuevaRubrica';
import Resumen_de_Rubrica from './pages/resumen_de_Rubrica';
import Software from './pages/softwares';
import EvaluarSoftware from './components/evaluarSoftware';
// pruebas de back
import Prueba from './pages/prueba';
import NewRubric from './pages/newRubric';
import NewSelectCriterion from './pages/newSelectCriterion';
import SeleccionarCards from './pages/pruebas/seleccionarCards';
import MostrarCriterios from './pages/pruebas/mostrarCriterios';


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
      <Route path='/evaluacion_de_Software' element={<Evaluacion_de_Software/>}/>
      <Route path='/nuevaRubrica' element={<NuevaRubrica/>}/>
      <Route path='/resumen_de_rubrica' element={<Resumen_de_Rubrica/>}/>
      <Route path='/softwares' element={<Software/>}/>
      <Route path='/newRubric' element={<NewRubric/>}/>
      <Route path='/newSelectCriterion' element={<NewSelectCriterion/>}/>
      <Route path='/evaluarSoftware' element={<EvaluarSoftware/>}/>

      {/* pruebas de back */}
      <Route path='/selectCards' element={<SeleccionarCards/>}/>
      <Route path='/mostrarCriterios' element={<MostrarCriterios/>}/>
      </Routes>
    </Router>
  );
}

export default App;
