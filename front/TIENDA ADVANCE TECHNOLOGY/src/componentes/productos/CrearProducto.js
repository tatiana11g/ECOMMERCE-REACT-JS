import React, { useState }  from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar'; 
import crud from '../../conexiones/crud';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const CrearProducto = () => {
  const navigate = useNavigate(); 
  
  const {idCategoria} = useParams();

    const [producto, setProducto] = useState({
        nombre:'',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:'',
        categoriaId:''

      })
      
    const { nombre, descripcion,stock, precio, imagen } = producto;

      const onChange = (e) =>{
        setProducto({
          ...producto,
          [e.target.name]: e.target.value
        })
      }

      const crearProducto = async () =>{
        const data = {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          stock: producto.stock,
          precio: producto.precio,
          imagen: producto.imagen,
          categoriaId: idCategoria

        }
       
          const response = await crud.POST(`/api/productos`, data);
          const mensaje = response.msg;
          console.log(mensaje);
          const mensaje1 = "El producto fue creado correctamente";
        swal({
          title:'Información',
          text: mensaje1,
          icon: 'success',
          buttons:{
            confirm:{
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });
          navigate(`/home-productos/${idCategoria}`);
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        crearProducto();
      }
      
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className="font-bold inline bg-gradient-to-r from-sky-50 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                     Crear Producto
            </h1>
        </div>
        
        <div className='mt-10 flex justify-center' >
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
            >
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={nombre}
                 required class="relative block w-full appearance-none rounded-none 
                rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

                  onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold' >descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder='descripcion'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={descripcion}
                 required class="relative block w-full appearance-none rounded-none 
                 rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

                  onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder='stock'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={stock}
                 required class="relative block w-full appearance-none rounded-none 
                 rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

                  onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder='precio'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={precio}
                 required class="relative block w-full appearance-none rounded-none 
                rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

                  onChange={onChange}
                />

              <label className='uppercase text-gray-600 block text-xl font-bold' >Imagen</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={imagen}
                  required class="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

                  onChange={onChange}
                />
              </div>

              <input 
                type="submit"
                value="Crear Producto"
                 className="bg-gray-500 mb-5 w-full py-3  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-500 transition-colors"
         />

            </form>
        </div >
       

        </main>
      </div>
      
      
    
      
      
      </>
    );
}

export default CrearProducto;