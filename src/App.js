import './App.css';
import NavBar from './components/NavBar';  // Asegúrate de la ruta correcta


function App() {
  return (
    <body className='bg-fondo'>
    <div className="App">
      <NavBar />
      {/* Aquí puedes añadir otros componentes o contenido */}
      <header className="App-header">
          <h1 class="text-3xl font-bold underline">
       Comienza a crear (tu rubrica)
      </h1>
      <button type='button' className='bg-botones rounded-lg hover:bg-opacity-90 active:bg-opacity-80 transition-colors duration-300 ease-in-out'>Comenzar ahora</button>

      </header>
    </div>
    </body>
  );
}

export default App;
