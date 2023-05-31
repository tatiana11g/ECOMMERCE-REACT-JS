import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert'; 

const Admin = () => {
  
  const navigate = useNavigate(); 

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

  const [categoria, setCategorias] = useState([]); //useState inicializa vacio

   const cargarCategorias = async () => {
       const response = await crud.GET(`/api/categorias`);
       //console.log(response);
       setCategorias(response.categoria); // la respuesta se carga en el  setCategorias
   }

   useEffect(() => {  // ejecuta para poder leer  cargarCategorias();
       cargarCategorias();
   }, [])


   const borrarCategoria = async (idCategoria) =>{  //ese idCategoria  es la id que le colocamos en la bd
    //modal de  sweet alert
    swal({
      title: "Estas seguro de eliminar la categoria?",
      text: "una vez eliminado, no se podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categorias/${idCategoria}`);// respuesta se concatena el id
        
        if(response){
          swal("Tu categoria a sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
       
      } else {
        swal("se cancelo la acción");
      }
    });
   }

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className= 'flex-1'>
   <h1 className="font-bold inline bg-gradient-to-r from-sky-50 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
    Listado de categorias
    </h1>
    <br></br> 
    <br></br> 
    <br></br> 
    <table className="table table-bordered">
        <thead className='bg-white'>
            <tr>
              {/* encabezados e la tabla */}
                <th style={{ width: '10%' }}>Imagen</th>
                <th style={{ width: '75%' }}>Nombre</th>
                <th style={{ width: '15%' }}>Opciones</th>
            </tr>
        </thead>
        
        <tbody className="bg-white">
            {
              // recorre todo el json que se hizo en categoria  que estaba vacio cargandolo con los elementos que tenga y lo pínta en la tabla 
                categoria.map(
                    item =>
                    // este key es invisible pero indica cuantos elementos trae la tabla para despues mostrarlo llave que recorre el map
                        <tr key={item._id}>
                          {/* renderiza */}
                            <td><img src={item.imagen}></img></td> 
                            <td>{item.nombre}</td>
                            <td>
                                <Link  
                                  to={`/home-productos/${item._id}`}
                                >crear producto</Link>&nbsp;&nbsp;
                                <Link 
                                 to={`/actualizar-categoria/${item._id}`}

                                >Editar</Link>&nbsp;&nbsp;
                                <button  
                                  //  invoca  la funcion del crud
                                    onClick={()=>borrarCategoria(item._id)}  //mandamos el id  del elemento a borrar
                                >Eliminar</button>
                            </td>
                        </tr>
                        )
                    }
        </tbody>
    </table>
</main>
</div>
      
      
    
      
      
      </>
    );
}

export default Admin;