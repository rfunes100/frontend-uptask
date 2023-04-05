import { useState, useEffect, createContext } from "react";
import ClienteAxios from "../config/ClienteAxios";
import { useNavigate } from "react-router-dom";
import NuevoProyecto from "../paginas/NuevoProyecto";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

const ProyectoContext = createContext();

const ProyectoProvider = ({ children }) => {
  const [proyectos, setproyectos] = useState([]);
  const [alerta, setalerta] = useState({});
  const [proyecto, setproyecto] = useState({});
  const [cargando, setcargando] = useState(false);
  const [modalfrmtarea, setmodalfrmtarea] = useState(false);
  const [tarea, settarea] = useState({});
  const [eliminartarea, seteliminartarea] = useState(false);
  const [colaborador, setcolaborador] = useState({});
  const [modealeliminarcolaborador, setmodealeliminarcolaborador] =
    useState(false);

  const [buscador, setbuscador] = useState(false);

  const navigate = useNavigate();

  const { suth } = useAuth();

  const obtenerproyecto = async (id) => {
    //console.log(id)
    setcargando(true);

    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("obteniendo el proyecto con las tareas");

      console.log("config", "token", id, email, token, config);
      const { data } = await ClienteAxios.post(
        `/proyectos/${id}`,
        { email },
        config
      );

      console.log("data", data.proyecto);
      setproyecto(data.proyecto);
      setalerta({});
    } catch (error) {
      navigate("/proyectos");
      //  conaole.log(error);
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
    }
    setcargando(false);
  };

  useEffect(() => {
    const obtenerproyectos = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await ClienteAxios("/proyectos", config);
        //   console.log('data', data)
        setproyectos(data);

        setalerta({
          msg: "Proyecto Creado Correctamente",
          error: false,
        });

        setTimeout(() => {
          setalerta({});
          navigate("/proyectos");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerproyectos();

    // return () => {
    //  obtenerproyectos();
    //  };
  }, [suth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const eliminarproyecto = async (id) => {
    //  console.log('id', id)
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.delete(`/proyectos/${id}`, config);

      const proyectoactualizado = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );

      setproyecto(proyectoactualizado);

      setalerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {}
  };

  const mostraralerta = (alerta) => {
    setalerta(alerta);

    setTimeout(() => {
      setalerta({});
    }, 5000);
  };

  const submitproyecto = async (proyecto) => {
    // console.log("procesando proyectos");

    if (proyecto.id) {
      await editarproyecto(proyecto);
    } else {
      await nuevoproyecto(proyecto);
    }
  };

  const editarproyecto = async (proyecto) => {
    // console.log("editando");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );
      // console.log(data)
      const proyectoactualizado = proyectos.map((proyectostate) =>
        proyectostate._id === data._id ? data : proyectostate
      );
      //  console.log(proyectoactualizado);
      setproyectos(proyectoactualizado);

      //  setproyectos([...proyectos , data ])

      setalerta({
        msg: "Proyecto Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      // console.log(error)
    }
  };

  const nuevoproyecto = async (proyecto) => {
    // console.log("nuevo");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.post("/proyectos", proyecto, config);
      // console.log(data)
      setproyectos([...proyectos, data]);

      setalerta({
        msg: "Proyecto Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      // console.log(error)
    }
  };

  const handlemodaltarea = () => {
    setmodalfrmtarea(!modalfrmtarea);
    settarea({});
  };

  const submittarea = async (tarea) => {
    console.log(" crear tarea  ", tarea);

    if (tarea?.id) {
      await editartarea(tarea);
    } else {
      await creartarea(tarea);
    }
  };

  const creartarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.post(`/tarea`, tarea, config);
      //  console.log("tarea data ", data);

      //  const proyectoctualizado = { ...proyecto };
      //  proyectoctualizado.tareas = [...proyecto.tareas, data];
      //  console.log("tarea proyectoctualizado ", proyectoctualizado);

      //  setproyecto(proyectoctualizado);
      setalerta({});
      setmodalfrmtarea(false);

      // socket io
      socket.emit("nueva tarea", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editartarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.put(
        `/tarea/${tarea.id}`,
        tarea,
        config
      );
      console.log(data);

      setalerta({});
      setmodalfrmtarea(false);

      // socket io
      socket.emit("actualizar tarea", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleeditartarea = (tarea) => {
    //  console.log("tarea", tarea);
    settarea(tarea);
    setmodalfrmtarea(true);
  };

  const handleiminartarea = (tarea) => {
    settarea(tarea);

    seteliminartarea(!eliminartarea);
  };

  const handleeliminartarea = async () => {
    // console.log("tarea a eliminar", tarea);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.delete(`/tarea/${tarea._id}`, config);

      setalerta({
        msg: data.msg,
        error: false,
      });
      // console.log(data);

      seteliminartarea(false);

      // socket io
      socket.emit("eliminar tarea", tarea);

      settarea({});
      setTimeout(() => {
        setalerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const subnitcolaborador = async (email) => {
    setcargando(true);
    console.log(email);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );
      setcolaborador(data);
      setalerta({});
      console.log(data);
    } catch (error) {
      console.log(error.response);
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setcargando(false);
  };

  const agregarcolaborador = async (email) => {
    console.log(proyecto);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await ClienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );

      console.log(data);
      setalerta({
        msg: data.msg,
        error: false,
      });
      setcolaborador({});
      setTimeout(() => {
        setalerta({});
      }, 3000);
      // setalerta({});
    } catch (error) {
      console.log(error);
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handlemodaleliminarcolaborador = (colaborador) => {
    console.log(colaborador);

    setmodealeliminarcolaborador(!modealeliminarcolaborador);
    setcolaborador(colaborador);
  };

  const eliminarcolaborador = async () => {
    console.log("elimina colaborador", colaborador);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("proyecto._id", colaborador._id, proyecto._id);

      const { data } = await ClienteAxios.post(
        `/proyectos/eliminar-colaboradores/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      console.log("eliminar", data);

      const proyectoactualizado = { ...proyecto };
      proyectoactualizado.colaborado = proyectoactualizado.colaborado.filter(
        (colarboadstate) => colarboadstate._id !== colaborador._id
      );
      setproyecto(proyectoactualizado);

      setalerta({
        msg: data.msg,
        error: false,
      });
      setcolaborador({});

      setTimeout(() => {
        setalerta({});
      }, 3000);

      //  setalerta({});
      setmodealeliminarcolaborador(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completartarea = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("id", id);
      const { data } = await ClienteAxios.post(
        `/tarea/estado/${id}`,
        { email },
        config
      );

      settarea({});
      setalerta({});

      // socket io
      socket.emit("cambiar estado", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlebuscador = () => {
    setbuscador(!buscador);
  };

  // socket io
  const submittareasproyectos = (tarea) => {
    const proyectoctualizado = { ...proyecto };
    proyectoctualizado.tareas = [...proyecto.tareas, tarea];
    //  console.log("tarea proyectoctualizado ", proyectoctualizado);

    setproyecto(proyectoctualizado);
  };

  const sumiteliminartareaproyecto = (tarea) => {
    const proyectoactualizado = { ...proyecto };
    proyectoactualizado.tareas = proyectoactualizado.tareas.filter(
      (tareastate) => tareastate._id !== tarea._id
    );

    setproyecto(proyectoactualizado);
  };

  const submiteditartareaproyecto = (tarea) => {
    const proyectoactualizado = { ...proyecto };
    proyectoactualizado.tareas = proyectoactualizado.tareas.map((tareastate) =>
      tareastate._id === tarea._id ? tarea : tareastate
    );

    setproyecto(proyectoactualizado);
  };

  const submitcambiarestado = (tarea) => {
    const proyectoactualizado = { ...proyecto };

    proyectoactualizado.tareas = proyectoactualizado.tareas.map((tareasstate) =>
      tareasstate._id === tarea._id ? tarea : tareasstate
    );
    setproyecto(proyectoactualizado);
  };

  const cerrarsesion = () => {
    setproyecto({});
    setproyectos([]);
    setalerta({});
  };

  return (
    <ProyectoContext.Provider
      value={{
        proyectos,
        mostraralerta,
        alerta,
        submitproyecto,
        obtenerproyecto,
        proyecto,
        cargando,
        eliminarproyecto,
        handlemodaltarea,
        modalfrmtarea,
        submittarea,
        handleeditartarea,
        tarea,
        handleiminartarea,
        eliminartarea,
        handleeliminartarea,
        subnitcolaborador,
        colaborador,
        agregarcolaborador,
        handlemodaleliminarcolaborador,
        modealeliminarcolaborador,
        eliminarcolaborador,
        completartarea,
        buscador,
        handlebuscador,
        submittareasproyectos,
        sumiteliminartareaproyecto,
        submiteditartareaproyecto,
        submitcambiarestado,
        cerrarsesion,
      }}
    >
      {children}
    </ProyectoContext.Provider>
  );
};

export { ProyectoProvider };

export default ProyectoContext;
