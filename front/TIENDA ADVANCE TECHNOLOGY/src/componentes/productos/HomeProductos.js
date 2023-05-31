import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams} from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../conexiones/crud';
import swal from 'sweetalert'; 
import ViewProductos from './ViewProductos';

const HomeProductos = () => {
  
  const navigate = useNavigate(); 

  const {idCategoria} = useParams();
  console.log(idCategoria)
  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect


  
    const [productos, setProductos] = useState([]);
  
    const cargarProductos = async () => {
      const response = await crud.GET(`/api/Productos/${idCategoria}`);
     // console.log(response);
      setProductos(response);
    }
  console.log(productos);
    useEffect(() => {
      cargarProductos();
    },[]);

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
            <main className= 'flex-1'>
              <div className='mt-10 flex justify-center'>
              <h1 className="font-bold inline bg-gradient-to-r from-sky-50 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                 Listado de Productos
                </h1>
                </div>  
              
            <div className='p-12'>
              {/* //boton */}
              <Link
                to={`/crear-producto/${idCategoria}`}
                className="bg-gray-500 mb-5 w-full py-3  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-500 transition-colors"
                >Crear Producto</Link>
            </div>
             {/* crear  grilla */}
            <div className="bg-slate-50 shadow mt-10 rounded-lg">
           
            {productos.map( producto =>  //recorre todo el json del  useStated
              
             //invocar  al componente
             <ViewProductos
             //se envia parametros el id y todo el jason completo
                key={producto._id}
                producto={producto}
              />
          
            )}
          </div>


            </main>
        </div>   

</>
    );
}

export default HomeProductos;