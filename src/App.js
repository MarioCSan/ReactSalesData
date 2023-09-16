
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'

import { Clientes } from './Componentes/Clientes';
import CreateCliente from './Componentes/UpdateCliente';
import UpdateCliente from './Componentes/UpdateCliente';

function App() {

  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Clientes />} />
        <Route path="/NuevoCliente" element={<CreateCliente />} />
        <Route
          path="/EditarCliente/:idCliente"
          element={
            <UpdateCliente/>
          }
        />

      
        {/* <Route path="/portfolio/:projectTitle" element={<ProjectDetails />} /> */}
        {/* Fallback route for unknown paths */}
        {/* <Route path="*" element={<Navigate to="/404" />} /> */}
      </Routes>
    </>
  );
}

export default App
