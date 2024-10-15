import '../App.css';
import NavBar from '../components/NavBar';  // Asegúrate de la ruta correcta
import 'animate.css';


function LandingPage() {
  return (
    <body className='bg-fondo'>
    <div className="App">
      <NavBar />
      {/* Aquí puedes añadir otros componentes o contenido */}
      <header className="App-header">
      <div>
        <div className="text-9xl font-bold text-left bg-gradient-to-r from-blue-500 from-10% to-Degradado2 bg-clip-text text-transparent">
          Comienza a crear 
          <div className="animate__animated animate__fadeInLeft animate__delay-1s bg-gradient-to-r from-blue-500 from-10% to-Degradado2 bg-clip-text text-transparent">
            tu rubrica
          </div>
        </div>
      </div> 
      <br/>
      
      


      </header>
    </div>
    </body>
  );
}

export default LandingPage;
