import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import ClienteAxios from "../config/ClienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alerta, setalerta] = useState({});

  const { setsuth, cargando } = useAuth();
  const navigate = useNavigate();

  console.log("cargando", cargando);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setalerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const { data } = await ClienteAxios.post(`/usuarios/login`, {
        email,
        password,
      });

      setalerta({});
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      setsuth(data);
      navigate("/proyectos");
    } catch (error) {
      console.log(error.response);
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl">
        {" "}
        Inicia sesion y administra tus {""}
        <span className=" text-slate-700 capitalize"> proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}></Alerta>}

      <form
        action=""
        className=" my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handlesubmit}
      >
        <div className="my-5">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="Password"
          >
            Password
          </label>
          <input
            type="Password"
            id="Password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesion"
          className=" bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
      hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className=" lg:flex lg:justify-between">
        <Link
          to="registrar"
          className=" block text-center my-5 text-slate-500 uppercase text-sm "
        >
          No tienes una cuenta? Registrate
        </Link>

        <Link
          to="olvide-password"
          className=" block text-center my-5 text-slate-500 uppercase text-sm "
        >
          Olvide password
        </Link>
      </nav>
    </>
  );
};

export default Login;
