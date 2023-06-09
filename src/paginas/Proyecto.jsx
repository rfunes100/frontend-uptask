import { Link, useParams } from "react-router-dom";
import useProyecto from "../hooks/useProyectos";
import { useEffect, useState } from "react";
import ModalFormulariotAREA from "../components/ModalFormulariotAREA";
import Tarea from "../components/Tarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client";

let socket;

const Proyecto = () => {
  const params = useParams();
  const {
    obtenerproyecto,
    proyecto,
    cargando,
    handlemodaltarea,
    alerta,
    submittareasproyectos,
    sumiteliminartareaproyecto,
    submiteditartareaproyecto,
    submitcambiarestado,
  } = useProyecto();

  useEffect(() => {
    obtenerproyecto(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", params.id);
  }, []);

  useEffect(() => {
    socket.on("tarea agregada", (tareanueva) => {
      console.log("tareanueva", tareanueva);
      if (tareanueva.proyecto === proyecto._id) {
        submittareasproyectos(tareanueva);
      }
    });

    socket.on("tarea eliminada", (tareaeliminada) => {
      if (tareaeliminada.proyecto === proyecto._id) {
        sumiteliminartareaproyecto(tareaeliminada);
      }
    });

    socket.on("tarea actualizada", (tareaactualizada) => {
      console.log("tareaactualizada.proyecto", tareaactualizada.proyecto);
      if (tareaactualizada.proyecto._id === proyecto._id) {
        submiteditartareaproyecto(tareaactualizada);
      }
    });

    socket.on("nuevo estado", (nuevestadotarea) => {
      if (nuevestadotarea.proyecto._id === proyecto._id) {
        submitcambiarestado(nuevestadotarea);
      }
    });
  });

  const { nombre } = proyecto;

  if (cargando) return "Cargando...";

  const { msg } = alerta;

  //  console.log("proyecto con tarea", msg, proyecto);

  const admin = useAdmin();
  // console.log(admin);

  return (
    <>
      <div className=" flex justify-between">
        <h1 className=" font-black text-4xl"> {nombre}</h1>

        {admin && (
          <div
            className=" flex items-center gap-2 text-gray-400 
        hover:text-black "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>

            <Link
              to={`/proyectos/editar/${params.id}`}
              className=" uppercase font-bold"
            >
              Editar
            </Link>
          </div>
        )}
      </div>

      {admin && (
        <button
          type="button"
          onClick={handlemodaltarea}
          className=" text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold
                bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clip-rule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className=" font-bold text-xl mt-10 "> Tarea del proyecto </p>
      <div className=" flex justify-center">
        <div className=" w-full md:w-1/3 lg:w-1/4"></div>
        {msg && <Alerta alerta={alerta}></Alerta>}
      </div>
      <div className=" bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea}></Tarea>
          ))
        ) : (
          <p className=" text-center my-5 p-10">
            {" "}
            No hay tareas en este proyecto{" "}
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className=" font-bold text-xl ">Colaboradores </p>

            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className=" text-gray-400 uppercase font-bold
           hover:text-black"
            >
              Agregar
            </Link>
          </div>
          <div className=" bg-white shadow mt-10 rounded-lg">
            {proyecto.colaborado?.length ? (
              proyecto.colaborado.map((colaborador) => (
                <Colaborador
                  key={colaborador._id}
                  colaborador={colaborador}
                ></Colaborador>
              ))
            ) : (
              <p className=" text-center my-5 p-10">
                {" "}
                No hay colaborador en este proyecto{" "}
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormulariotAREA></ModalFormulariotAREA>
      <ModalEliminarTarea></ModalEliminarTarea>
      <ModalEliminarColaborador></ModalEliminarColaborador>
    </>
  );
};

export default Proyecto;
