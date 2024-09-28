import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';  // Asegúrate de la ruta correcta

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* Aquí puedes añadir otros componentes o contenido */}
      <header className="App-header">
        <p>Bienvenido a UXsperience</p>
      </header>
    </div>
  );
}

export default App;
