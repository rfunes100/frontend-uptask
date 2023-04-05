
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"


import ClienteAxios from '../config/ClienteAxios'


const NuevoPassword = () => {

  const [tokenvalido , settokenvalido ] = useState(false)
  const [ alerta, setalerta] = useState({})
  const [password , setpassword] = useState('')
  const [passwordmodificado , setpasswordmodificado] = useState(false)




  const params = useParams()
  const { token } = params
  console.log(token)

  useEffect(() => {
    const comporbarToken = async () => {
      try {
      
        
       await ClienteAxios(`/usuarios/olvide-password/${token}`)
       // console.log(data)
       settokenvalido(true)

      } catch (error) {
        setalerta({
          msg: error.response.data.msg,
          error: true 
        })
        console.log(error.response)
      }

    }
    comporbarToken()
  
    return () => {
      comporbarToken()
    }
  }, [])

  const handlesubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setalerta({
        msg: 'password debe ser minimo 6 caracteres',
        error:true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data } = await  ClienteAxios.post(url, {password})
     // console.log(data)
      setalerta({
        msg:  data.msg,
        error:false
      })
      setpasswordmodificado(true)
  
    } catch (error) {
      setalerta({
        msg: error.reponse.data.msg,
        error:true
      })
    }

  }

  const {msg } = alerta 


  return (

<>
 <h1 className=" text-sky-600 font-black text-6xl"> Restablece tu password y ni pierdas accesos a tus {''}
  <span className=" text-slate-700 capitalize"> proyectos</span> 
  </h1>

{ msg && <Alerta alerta={alerta}></Alerta> }
 {tokenvalido &&  (

  <form action="" 
  onSubmit={handlesubmit}
  className=" my-10 bg-white shadow rounded-lg p-10">
   

      <div className="my-5">
      <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="Password">
          Nuevo Password
          </label>
      <input type="Password"
      id="Password"
      placeholder="nuevo pasword"
      value={password}
      onChange={ e => setpassword( e.target.value)}
      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
      
      />

      </div>




      <input type="submit"
      value="Guardar NUevo password"
      className=" bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
        hover:cursor-pointer hover:bg-sky-800 transition-colors" 
      />



    </form>

 )}

{passwordmodificado && (
          <Link to="/"
          className=" block text-center my-5 text-slate-500 uppercase text-sm "
          >Inicia sesion
          
          </Link>


      )}



</>


  )
}

export default NuevoPassword