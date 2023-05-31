import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import crud from '../conexiones/crud';

const Home = () => {
  
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async ()=>{
    
    const response = await crud.GET(`/api/categorias/home`)
    setCategorias(response.categoria)
  }

  useEffect(() =>{
    cargarCategorias();
  },[]);

  const [productos, setProductos] = useState([]);

  const cargarProductos = async ()=>{
    
    const response = await crud.GET(`/api/productos/home`)
    setProductos(response.producto1)
  }
console.log(productos);
  useEffect(() =>{
    cargarProductos();
  },[]);


  return (
      <main className='flex-1'>
         <div className='md:w-2/3 lg:w-2/5 p-10  '   >
        

            <h1 className="font-bold inline bg-gradient-to-r from-slate-500 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Advance  Technology
            </h1>

            <div className='mt-4 flex justify-left'>
            <Link 
            to={"/login"}
            className=" font-bold block text-center my-5 text-sky-400 uppercase text-sm items-center"
            >Inicio de Sesión</Link>
            </div>
         </div>
      
         <div className="bg-white">
      <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mostrar por Categoria</h2>
          <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
          <img src="https://res.cloudinary.com/doxdyplck/image/upload/v1669739287/IMG-20221128-WA0018_wbkulj.jpg" width="150" height="150"></img>
 
            Todas las categorias
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
     
        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categorias.map((category) => (
                  <a
                    key={category.nombre}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imagen} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">{category.nombre}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Todas las categorias
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>


    <div className="bg-sky-900">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-50">Clientes tambien compraron</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {productos.map((product) => (
            <div key={product._id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imagen}
                    
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-50">{product.nombre}</h3>
                  <p className="mt-1 text-sm text-gray-50">{product.stock}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.precio}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Agregar al carrito<span className="sr-only">, {product.nombre}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      </main>
    );
}

export default Home;