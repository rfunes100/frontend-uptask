import { useContext } from "react";
import AuthContext from "../context/AUthProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth 