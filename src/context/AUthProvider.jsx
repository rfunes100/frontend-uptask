import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import ClienteAxios from "../config/ClienteAxios";

const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [suth, setsuth] = useState({});
  const [cargando, setcargando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    //   console.log('  autenticarusuario')

    //  return () => {
    const autenticarusuario = async () => {
      const token = localStorage.getItem("token");
      //   console.log(token)
      if (!token) {
        setcargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await ClienteAxios(`/usuarios/perfil`, config);
        setsuth(data);
        //  navigate('/proyectos')
        //  console.log(data)
      } catch (error) {
        console.log(error);
        setsuth({});
      }
      setcargando(false);
    };
    autenticarusuario();

    //  autenticarusuario()

    //  }
  }, []);

  const cerrarsesionaut = () => {
    setsuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        setsuth,
        suth,
        cargando,
        cerrarsesionaut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Authprovider };

export default AuthContext;
