import { useState, useEffect } from "react"
import useProyecto from "../hooks/useProyectos"
import Alerta from "./Alerta"
import { useParams } from "react-router-dom"


const FormularioProyecto = () => {


  
    const [ id , setid ] = useState(null)
    const [ nombre , setnombre ] = useState('')
    const [ descripcion , setdescripcion ] = useState('')
    const [ fechaentrega , setfechaentrega ] = useState('')
    const [ cliente , setcliente ] = useState('')

    const params = useParams()

    console.log(params)


    const { mostraralerta , alerta, submitproyecto, proyecto } = useProyecto()


    useEffect(() => {
      if(  params.id ) {
        setid(proyecto._id)
        setnombre(proyecto.nombre)
        setdescripcion(proyecto.descripcion)
        setfechaentrega(proyecto.fechaentrega?.split('T')[0])
        setcliente(proyecto.cliente)
        

        console.log('fechaentrega', proyecto.fechaentrega.split('T')[0] )
        console.log('editando..')


      } else {
        console.log('nuevo proyecto..')

      }

    
    }, [params])
    

    const  handlesubmit =  async  e  => {
        e.preventDefault() 

        if([  nombre , descripcion, fechaentrega , cliente].includes('')) {
            console.log('todos los campos son obligatorios')
            mostraralerta({
                msg: 'todos los campos son obligatorios',
                error: true
            })
            return 



        }

        // pasar los datos a provider 
       await   submitproyecto( { id ,  nombre , descripcion, fechaentrega , cliente })
       setid(null)

       setnombre('')
       setdescripcion('')
       setfechaentrega('')
       setcliente('')
       


    }


    const { msg } = alerta


  return (
    <form action="" className=' bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
     onSubmit={handlesubmit}
    >


        { msg &&  <Alerta alerta={alerta}> </Alerta>}
        <div className=" mb-5"> 
             <label htmlFor="nombre" className=' text-gray-700 uppercase font-bold text-sm'
               
             >
                Nombre Proyecto
             </label>

             <input type="text"
             value={nombre}
             onChange={ e => setnombre( e.target.value) }
             id='nombre'
              className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='nombre proyecto'
              
             />
        </div>

        <div className=" mb-5"> 
             <label htmlFor="descripcion" className=' text-gray-700 uppercase font-bold text-sm'
               
             >
               Descripcion 
             </label>

             <textarea type="text"
             value={descripcion}
             onChange={ e => setdescripcion( e.target.value) }
             id='descripcion'
              className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='descripcion'
              
             />
        </div>


        <div className=" mb-5"> 
             <label htmlFor="fechaentrega" className=' text-gray-700 uppercase font-bold text-sm'
               
             >
               Fecha entrega 
             </label>

             <input type="date"
             value={fechaentrega}
             onChange={ e => setfechaentrega( e.target.value) }
             id='fechaentrega'
              className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='fecha entrega'
              
             />
        </div>

        <div className=" mb-5"> 
             <label htmlFor="cliente" className=' text-gray-700 uppercase font-bold text-sm'
               
             >
                Nombre Cliente
             </label>

             <input type="text"
             value={cliente}
             onChange={ e => setcliente( e.target.value) }
             id='nombre'
              className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='nombre cliente'
              
             />
        </div>

        <input type="submit"
         value={ id ? 'Actualizar proyecto' : 'Crear Proyecto'}
         className=" bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer
          hover:bg-sky-700 transition-colors"
        />




      



    </form>
  )
}

export default FormularioProyecto