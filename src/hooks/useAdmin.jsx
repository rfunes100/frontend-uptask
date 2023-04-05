import useProyecto from "./useProyectos";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { proyecto } = useProyecto();

  const { suth } = useAuth();

  return proyecto.creador === suth._id;
};

export default useAdmin;
