import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const RutaProtegida = () => {

    const { suth , cargando } = useAuth()
    console.log('suth', suth)

    if( cargando) return 'cargando...'

  return (
    <>
        {suth._id ? (
            <div className=" bg-gray-100">
                <Header>

                </Header>

                <div className=" md:flex md:min-h-screen">
                    <Sidebar>

                    </Sidebar>

                    <main className=" p-10  flex-1 ">
                        <Outlet></Outlet>
                    </main>

                </div>

            </div>

        ):  <Navigate to="/"> </Navigate> }

    </>
  )
}

export default RutaProtegida