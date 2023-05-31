import React from 'react'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    //ancho,padin,fondo
    <aside className='md:w-60 lg:w-90 px-5 py-10 bg-gray-900'>
        <p className='text-xl font-bold  text-white'>Administrador</p>
         {/* boton */}
        <Link 
            to={"/crear-categorias"}
            //fondo, color texto maysculas neegrilla, toma todo el espacio, centrado esquinas redondas    
            className="bg-gray-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-sky-500 transition-colors"
            >Crear Categorias</Link>
       
       {/* dar espacio entre botones */}
       <div className='py-10'>
      <Link 
            to={"/admin"}
            className="bg-gray-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-sky-500 transition-colors"
            >Admin Categorias</Link>
      </div>
    </aside>
    );
}

export default Sidebar;