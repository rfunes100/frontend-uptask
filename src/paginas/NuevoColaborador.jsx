import Formulariocolaborador from "../components/Formulariocolaborador";
import { useEffect } from "react";
import useProyecto from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  const {
    obtenerproyecto,
    proyecto,
    cargando,
    colaborador,
    agregarcolaborador,
    alerta,
  } = useProyecto();
  const params = useParams();

  useEffect(() => {
    obtenerproyecto(params.id);
  }, []);

  console.log("colaborador", colaborador);

  //  if (cargando) return "Cargando...";

  if (!proyecto?._id) return <Alerta alerta={alerta}></Alerta>;

  return (
    <>
      <h1 className=" text-4xl font-black">
        Agregar Colaborador al Proyecto: {proyecto.nombre}
      </h1>

      <div className=" mt-10 flex justify-center">
        <Formulariocolaborador></Formulariocolaborador>
      </div>

      {cargando ? (
        <p className=" text-center">cargando... </p>
      ) : (
        colaborador?._id && (
          <div className=" flex justify-center mt-10">
            <div
              className=" bg-white py-10 px-5 md:w-1/2
             rounded-lg shadow w-full"
            >
              <h2 className=" text-center mb-10 text-2xl font-bold">
                Resultado
              </h2>
              <div className=" flex justify-between items-center">
                <p>{colaborador.nombre}</p>

                <button
                  type="button"
                  className=" bg-slate-500 px-5 py-2 rounded-lg
                   uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarcolaborador({
                      email: colaborador.email,
                    })
                  }
                >
                  Agregar proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
