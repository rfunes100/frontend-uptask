import { Link } from "react-router-dom";
import useProyecto from "../hooks/useProyectos";
import Busqueda from "./Busqueda ";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { handlebuscador, cerrarsesion } = useProyecto();
  const { cerrarsesionaut } = useAuth();

  const handlecerrarsesion = () => {
    cerrarsesionaut();
    cerrarsesion();
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  return (
    <header className=" px-4 py-5 bg-whit border-b">
      <div className="md:flex md:justify-between">
        <h2
          className=" text-4xl text-sky-600 font-black text-center 
         mb-5 md:mb-0"
        >
          UpTask
        </h2>

        <div className=" flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className=" font-bold uppercase"
            onClick={handlebuscador}
          >
            Buscar Proyecto
          </button>

          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>

          <button
            type="button"
            className=" text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={handlecerrarsesion}
          >
            Cerrar Sesion
          </button>

          <Busqueda></Busqueda>
        </div>
      </div>
    </header>
  );
};

export default Header;
