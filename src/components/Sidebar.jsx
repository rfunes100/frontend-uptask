import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { suth } = useAuth();

  return (
    <aside className=" md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold "> Hola: {suth.nombre} </p>

      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 uppercase font-bold block text-white mt-5 text-center rounded-lg "
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
