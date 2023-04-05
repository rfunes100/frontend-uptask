import { useState } from "react";
import useProyecto from "../hooks/useProyectos";
import Alerta from "./Alerta";

const Formulariocolaborador = () => {
  const [email, setemail] = useState("");

  const { mostraralerta, alerta, subnitcolaborador } = useProyecto();

  const handlesubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostraralerta({
        msg: "el email es obligatorio",
        error: true,
      });
      return;
    }

    subnitcolaborador(email);
  };

  const { msg } = alerta;

  return (
    <form
      className=" bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handlesubmit}
    >
      {msg && <Alerta alerta={alerta}></Alerta>}
      <div className="mb-5">
        <label
          htmlFor="email"
          className=" text-gray-700 uppercase
                                            font-bold text-sm"
        >
          Email Colaborador
        </label>

        <input
          type="email"
          id="email"
          placeholder={"email del usuario"}
          className=" border-2 w-full p-2 mt-2 
                                              placeholder-gray-400 "
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className=" bg-sky-700 hover:bg-sky-700
                                         w-full p-3 text-white uppercase font-bold
                                          cursor-pointer transition-colors rounded"
        value={"buscar colaborador"}
      />
    </form>
  );
};

export default Formulariocolaborador;
