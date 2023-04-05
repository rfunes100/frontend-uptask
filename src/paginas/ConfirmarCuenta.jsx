
import { useEffect, useState  } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"

import ClienteAxios from '../config/ClienteAxios'


const ConfirmarCuenta = () => {

  const [alerta , setAlerta] = useState({})
  const [cuentaconfirmada , setcuentaconfirmada] = useState(false)


  const params = useParams()
  const {id } = params
  

  console.log(id)

  useEffect(() => {

    const confirmacuenta = async () => {
      try {
        
        
        const url = `/usuarios/confirmar/${id}`
        console.log('url', url)
        const {data } = await ClienteAxios(url) 

       // console.log(data)
        setAlerta({
          msg: data.msg, 
          error: false
        })
        setcuentaconfirmada(true)


      } catch (error) {
     //   console.log(error)
        setAlerta({
          msg: error.response.data.msg, 
          error: true
        })
      }

    }
  //  first
  confirmacuenta()
    return () => {
    //  second
    confirmacuenta()
    }

  }, [])

  
  const {msg } = alerta 


  return (
    <>

    <h1 className=" text-sky-600 font-black text-6xl">Confirma tu cuenta y crea a tus {''}
    <span className=" text-slate-700 capitalize"> proyectos</span> 
    </h1>

    <div className=" mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
      { msg &&  <Alerta alerta={alerta}></Alerta>}

      {cuentaconfirmada && (
          <Link to="/"
          className=" block text-center my-5 text-slate-500 uppercase text-sm "
          >Inicia sesion
          
          </Link>


      )}
    </div>

    </>

  )
}

export default ConfirmarCuenta