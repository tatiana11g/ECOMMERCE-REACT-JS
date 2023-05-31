import React, { useEffect, useState }  from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar'; 
import crud from '../../conexiones/crud';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarProducto = () => {
    
    const navigate = useNavigate(); 
    //leer el idCategoria con el Hook  y 
    const {idCategoria, idProducto} = useParams();

    console.log(idCategoria);
    console.log(idProducto);
    
    const [producto, setProducto] = useState({
        nombre:'',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:'',
        categoriaId:''
      })
      console.log(idProducto)
      
      //Hacer el GET
      const cargarProducto = async () =>{
        const response = await crud.GET(`/api/productos/producto/${idProducto}`);
        console.log(response);
        //llenando las cajas
        setProducto(response.producto);
      }
      console.log(producto)
      const { nombre, descripcion,stock, precio, imagen } = producto;

      //Para poder ejecutar una funcion y llenar las cajas
      useEffect(() =>{ 
        cargarProducto();
      },[]);//para que solo se cargue una vez

      const onChange = (e) =>{
        setProducto({
          ...producto,
          [e.target.name]: e.target.value
        })
      }

      const actualizarProducto = async () =>{
        const data = {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          stock: producto.stock,
          precio: producto.precio,
          imagen: producto.imagen,
          categoriaId: idCategoria

        }
       //console.log(data, idCategoria);
          const response = await crud.PUT(`/api/productos/${idProducto}`, data);
          console.log(response);
          const mensaje1 = "el producto se actualizo correctamente";
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
          navigate(`/home-productos/${response.producto1.categoriaId}`);
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarProducto();
      }
      
     
      
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className="inline bg-gradient-to-rfrom-slate-500 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Actualizar Categorias
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
                  onChange={onChange}
                />
              </div>

              <input 
                type="submit"
                value="Actualizar Producto"
                 className="bg-gray-500 mb-5 w-full py-3  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-500 transition-colors"
         />

            </form>
        </div >
       

        </main>
      </div>
      
      
      </>
    );
}

export default ActualizarProducto;