import React, { useState }  from 'react';
import Header from './Header';
import Sidebar from './Sidebar'; 
import crud from '../conexiones/crud';
import { Link, useNavigate } from 'react-router-dom';

const CrearCategoria = () => {
  const navigate = useNavigate(); 
    
    const [categoria, setCategoria] = useState({
        nombre:'',
        imagen:''
      })
      
    const { nombre, imagen} = categoria; //constante para armar el json

      const onChange = (e) =>{
        setCategoria({
          ...categoria,
          [e.target.name]: e.target.value
        })
      }

      const crearCategoria = async () =>{
        const data = {
          nombre: categoria.nombre,
          imagen: categoria.imagen
        }
          //mandar a la bd
          const response = await crud.POST(`/api/Categorias`, data);
          const mensaje = response.msg;
          console.log(mensaje); //lo que devuelve  si se creo categoria
          navigate("/admin");
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault(); //hace los componentes fijos que no se actualice
        crearCategoria();
      }
      
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className="font-bold inline bg-gradient-to-r from-slate-500 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Crear Categoria
            </h1>
        </div>
        
        <div className='mt-10 flex justify-center' >
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}   //dispara el formulario
            >
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre de la categoria</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={nombre}
                 required class="relative block w-full appearance-none rounded-none 
                rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

                  onChange={onChange}   //dispara la caja
                />
                {/* caja de la imagen */}
                <label className='uppercase text-gray-600 block text-xl font-bold' >Imagen de la categoria</label>
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
                value="Crear Categoria"
                className="bg-gray-500 mb-5 w-full py-3  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-500 transition-colors"      />

            </form>
        </div >
       

        </main>
      </div>
      
      
    
      
      
      </>
    );
}

export default CrearCategoria;