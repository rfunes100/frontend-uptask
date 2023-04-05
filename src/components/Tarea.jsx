import { Formaterafecha } from "../helpers/Formaterafecha";
import useProyecto from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const {
    handleeditartarea,
    handleiminartarea,
    eliminartarea,
    completartarea,
  } = useProyecto();

  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea;

  const admin = useAdmin();

  console.log("tarea completado", tarea);

  return (
    <div className=" border-b p-5 flex justify-between items-center">
      <div className=" flex flex-col items-start">
        <p className=" mb-1 text-xl"> {nombre}</p>
        <p className=" mb-1 text-sm text-gray-500 uppercase"> {descripcion}</p>
        <p className=" mb-1 text-xl text-gray-600"> Prioridad: {prioridad}</p>
        <p className=" mb-1 text-sm"> {Formaterafecha(fechaEntrega)}</p>
        {estado && (
          <p
            className=" text-xs bg-green-600 uppercase p-1
         rounded-lg text-white"
          >
            {" "}
            Completada por : {tarea.completado.nombre}{" "}
          </p>
        )}
      </div>

      <div className=" flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className=" bg-indigo-600 px-4 py-3 text-white uppercase font-bold
         text-sm rounded-lg "
            onClick={() => handleeditartarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold
        text-sm rounded-lg `}
          onClick={() => completartarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className=" bg-red-600 px-4 py-3 text-white uppercase font-bold
         text-sm rounded-lg "
            onClick={() => handleiminartarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
