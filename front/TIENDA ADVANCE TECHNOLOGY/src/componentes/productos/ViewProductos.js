import React from 'react'
import { Link } from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert'; 


export const ViewProductos = ({producto, cargarProductos})  => {   //se pasa la informacion  por producto

    const {nombre, descripcion, stock, precio,imagen} = producto;  //arreglo
 

   

    const borrarProducto = async (idProducto) =>{
        //modal de  sweet alert
        swal({
          title: "Estas seguro de eliminar la producto?",
          text: "una vez eliminado, no se podra recuperar este producto",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            const response = crud.DELETE(`/api/productos/${idProducto}`);
            
            if(response){
              swal("Tu producto ha sido borrada correctamente", {
                icon: "success",
              });
            }
            window.location.reload()
           
          } else {
            swal("se cancelo la acción");
          }
        });
       }








    return(
        <div
          //borde- espacio de  5-llene toda la caja -en el extremo informacion y el otro botones
            className='border-r p-5 flex justify-between items-center'
        >  
        {/* los items comiencen al inicio */}
            <div className='flex flex-col items-start grid grid-cols-4'>
                {/* parrafo -tamaño de texto color texto*/}
                <div className='text-center'>
                  <img style={{ display :  'initial' }} src={imagen} width="200" height="150" ></img>
                </div>
                <div class="col-start-2 col-span-2">
                  <p className='mb-1 text-xl text-black-50'> <b>Nombre: </b> {nombre}</p>
                  <p className='mb-1 text-xl text-black-50 '><b>Descripción: </b>{descripcion}</p>
                  <p className='mb-1 text-xl text-black-50'><b>Stock: </b>{stock}</p>
                  <p className='mb-1 text-xl text-black-50'><b>Precio: </b>{precio}</p>
                </div>
                <div style={{ margin : '0 auto' }}>

                <Link 
                                 to={`/actualizar-producto/${producto._id}`}

                                ><button
                                className="bg-sky-400 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-slate-400 transition-colors"
                             
                            
                            >Editar</button></Link>&nbsp;&nbsp;
                <button
                          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-slate-400 transition-colors"
                          onClick={()  => borrarProducto(producto._id)}
                      >Eliminar</button>
                </div>
                  
                
            </div>
        
        </div>
    )
}

export default ViewProductos