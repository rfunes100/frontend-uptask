
import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"


import ClienteAxios from '../config/ClienteAxios'



const OlvidePassword = () => {

  const [ email , setemail ] = useState('')
  const [alerta , setalerta] = useState({})

  const handlesubmit = async e => {
    e.preventDefault()

    if(email === '' || email.length < 6) {
      setalerta({
        msg: 'el email es obligatorio',
        error: true 
      })
      return 


    }

    try {
      
      const {data } = await ClienteAxios.post(`/usuarios/olvide-password`,{ email})

      console.log(data)
      setalerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      console.log(error.response)
      setalerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const  { msg } = alerta

  return (
    
       
<>
 <h1 className=" text-sky-600 font-black text-6xl"> Recupera tu accesos y no pierdas tus {''}
  <span className=" text-slate-700 capitalize"> proyectos</span> 
  </h1>

 {msg && <Alerta alerta={alerta}></Alerta>}


  <form action=""
  onSubmit={handlesubmit}
   className=" my-10 bg-white shadow rounded-lg p-10">
  

    <div className="my-5">
    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
        Email
        </label>
    <input type="email"
    id="email"
     placeholder="email de registro"
     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
     value={email}
     onChange={ e => setemail(e.target.value)}
    
    />

    </div>

    

    <input type="submit"
     value="Enviar Instrucciones"
     className=" bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
      hover:cursor-pointer hover:bg-sky-800 transition-colors" 
    />



  </form>

  <nav className=" lg:flex lg:justify-between">
    <Link to="/"
    className=" block text-center my-5 text-slate-500 uppercase text-sm "
    >Ya tienes una cuenta? Inicia sesion
    
    </Link>

    <Link to="registrar"
    className=" block text-center my-5 text-slate-500 uppercase text-sm "
    >No tienes una cuenta? Registrate
    
    </Link>
    
 

  </nav>
</>

  )
}

export default OlvidePassword