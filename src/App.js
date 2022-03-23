import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Clientes from './pages/Clientes'
import NotFound from './pages/NotFound'
import NavbarNav from './componsts/NavbarNav'
import Cliente from './pages/Cliente'
import Coche from './pages/Coche'
import Vehiculo from './pages/Vehiculo'
import Piesa from './pages/Piesa'
import Servicios from './pages/Servicios'
import Tipotrabajos from './pages/TipoTrabajos'
import Empleado from './pages/Empleado'
import Asignacion from './pages/Asignacion'
import Materiales from './pages/Materiales'
import Sidebar from './componsts/Sidebar'
import TypoServicio from './pages/TypoServicio'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <NavbarNav />
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/cliente/:id" element={<Cliente />} />
                    <Route path="/coche" element={<Coche />} />
                    <Route path="/:cliente/:id/vehiculos" element={<Vehiculo />} />
                    <Route path="/:cliente/:cliente_id/vehiculos/:coche/:coche_id/servicios" element={<Servicios />} />
                    <Route path="/:cliente/:cliente_id/vehiculos/:coche/:coche_id/asignacion" element={<Asignacion />} />
                    <Route path="/piesa" element={<Piesa />} />
                    <Route path="/trabajos" element={<Tipotrabajos />} />
                    <Route path="/empleados" element={<Empleado />} />
                    <Route path="/materiales" element={<Materiales />} />
                    <Route path='/typo' element={<TypoServicio />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
