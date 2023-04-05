import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import { Authprovider } from "./context/AUthProvider";
import { ProyectoProvider } from "./context/ProyectoProvider";

import Proyectos from "./paginas/Proyectos";
import RutaProtegida from "./layouts/RutaProtegida";
import NuevoProyecto from "./paginas/NuevoProyecto";
import Proyecto from "./paginas/Proyecto";
import EditarProyecto from "./paginas/EditarProyecto";
import NuevoColaborador from "./paginas/NuevoColaborador";

function App() {
  return (
    <BrowserRouter>
      <Authprovider>
        <ProyectoProvider>
          <Routes>
            <Route path="/" element={<AuthLayout></AuthLayout>}>
              <Route index element={<Login></Login>}></Route>
              <Route path="registrar" element={<Registrar></Registrar>}></Route>
              <Route
                path="olvide-password"
                element={<OlvidePassword></OlvidePassword>}
              ></Route>
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword></NuevoPassword>}
              ></Route>
              <Route
                path="confirmar/:id"
                element={<ConfirmarCuenta></ConfirmarCuenta>}
              ></Route>
            </Route>

            <Route path="proyectos" element={<RutaProtegida></RutaProtegida>}>
              <Route index element={<Proyectos></Proyectos>}></Route>
              <Route
                path="crear-proyecto"
                element={<NuevoProyecto></NuevoProyecto>}
              ></Route>
              <Route
                path="nuevo-colaborador/:id"
                element={<NuevoColaborador></NuevoColaborador>}
              ></Route>
              <Route
                path="editar/:id"
                element={<EditarProyecto></EditarProyecto>}
              ></Route>
              <Route path=":id" element={<Proyecto></Proyecto>}></Route>
            </Route>
          </Routes>
        </ProyectoProvider>
      </Authprovider>
    </BrowserRouter>
  );
}

export default App;
