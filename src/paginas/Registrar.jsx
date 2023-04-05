import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'


import ClienteAxios from '../config/ClienteAxios'



const Registrar = () => {

    const [nombre , setnombre] = useState('')
    const [email , setemail] = useState('')
    const [password , setPassword] = useState('')
    const [repetirpassword , setrepetirpassword] = useState('')
    const [alerta , setalerta] = useState({})


    const handlesubmit = async  e => {
      e.preventDefault()
console.log( 'datos', nombre , email, password, repetirpassword)
      if([ nombre , email, password, repetirpassword].includes('')){
        setalerta({ msg: 'todos los campos son requeridos',
                  error: true 
                })
             return    

      }

      if(password !== repetirpassword) {
        setalerta({ msg: 'Los passwords nos son iguales',
        error: true 
      })
   return    

      }

      if(password.length < 6 ) {
        setalerta({ msg: 'Los passwords muy corto, agregar minimo 6 caracteres',
        error: true 
      })
   return    

      }

      setalerta({})
      //crear el usuario en api 
      console.log('creando')


  



      try {


        
        const datos = {  nombre ,  password , email };


        const options = {
          method: 'POST',
          timeout: 10000 // Establece el tiempo de espera en 5 segundos (5000 ms)
        };

    
     
       console.log('data', datos)
        const { data } = await ClienteAxios.post(  `/usuarios/`//, datos 
       ,  {  nombre ,  password , email }
        ) 
   

        console.log(data)
        setalerta({
          msg: data.msg,
          error: false 

        })
        setnombre('')
        setemail('')
        setPassword('')
        setrepetirpassword('')

   
        
        
      } catch (error) {
        setalerta({
          msg: error.response.data.msg,
          error: true 

        })

       // console.log(error.response.data.msg)
        
      }


    }

    const {msg} = alerta


  return (

  
    
<>
 <h1 className=" text-sky-600 font-black text-6xl"> Crea cuenta y administra tus {''}
  <span className=" text-slate-700 capitalize"> proyectos</span> 
  </h1>

  {msg && <Alerta alerta={alerta}></Alerta>}

  <form action="" 
  onSubmit={handlesubmit}
  className=" my-10 bg-white shadow rounded-lg p-10"
  >
    <div className="my-5">
    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">
        Nombre
        </label>
    <input type="text"
    id="nombre"
     placeholder="nombre"
     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
     value={nombre}
     onChange={ e => setnombre(e.target.value)}
    
    />

    </div>

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

    <div className="my-5">
    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
        Password
        </label>
    <input type="Password"
    id="password"
     placeholder="password de registro"
     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
     value={password}
     onChange={ e => setPassword(e.target.value)}

    
    />

    </div>


    <div className="my-5">
    <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="repetirpassword">
       Repetir Password
        </label>
    <input type="Password"
    id="repetirpassword"
     placeholder="Repetir Password"
     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
     value={repetirpassword}
     onChange={ e => setrepetirpassword(e.target.value)}

    
    />

    </div>


    <input type="submit"
     value="Crear cuenta"
     className=" bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
      hover:cursor-pointer hover:bg-sky-800 transition-colors" 
    />



  </form>

  <nav className=" lg:flex lg:justify-between">
    <Link to="/"
    className=" block text-center my-5 text-slate-500 uppercase text-sm "
    >Ya tienes una cuenta? Inicia sesion
    
    </Link>

    <Link to="olvide-password"
    className=" block text-center my-5 text-slate-500 uppercase text-sm "
    >Olvide password
    
    </Link>


  </nav>
</>


  )
}

export default Registrar