import './App.css';
import Cotizador from './components/Cotizador/Index'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateService from './components/CreateService';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Cotizador />}/>
          <Route path="/crear-servicio" element={<CreateService />}/>
          <Route path="/crear-cotizacion" element={<Cotizador/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
