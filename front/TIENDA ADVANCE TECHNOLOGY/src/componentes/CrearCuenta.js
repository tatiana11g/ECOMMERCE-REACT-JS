import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; 
import crud from '../conexiones/crud';


const CrearCuenta = () => {
  
  const navigate = useNavigate(); 
  
  const [usuario, setUsuario] = useState({
    nombre:'',
    email:'',
    password:'',
    confirmar:''
  })

  const { nombre, email, password, confirmar} = usuario;

  const onChange = (e) =>{
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const crearCuenta = async () =>{
    //los dos password deben ser iguales
    if(password !== confirmar){
      console.log("son diferentes");
      const mensaje = "Las contraseñas son diferentes.";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    }else{
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      console.log(data);
      const response = await crud.POST(`/api/usuarios`, data);
      const mensaje = response.msg;
      if(mensaje === ' el usuario ya existe'){
        const mensaje = "el usuario ya existe";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons:{
            confirm:{
              text:'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        })
      }else{
        const mensaje = "El usuario fue creado correctamente";
        swal({
          title: 'Información',
          text: mensaje,
          icon: 'success',
          buttons:{
            confirm:{
              text:'OK',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });
        
        setUsuario({
          nombre:'',
          email:'',
          password:'',
          confirmar:''
        })
        //redireccionar a la pantalla de login
        navigate("/login");
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  }


  
  
  
  return (
    
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-2/5'>
         <h1 className="font-bold inline bg-gradient-to-r  from-sky-50 via-neutral-900 to-sky-50 bg-clip-text font-display text-5xl tracking-tight text-transparent">
            Crea tu Cuenta en Advance Technology
         </h1>

          <form 
            onSubmit={onSubmit}
            className='my-10 bg-white shadow rounded-lg p-10'
          >
           <div className='my-5'>
           <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
             <input
               type="nombre"
               id="nombre"
               name="nombre"
               placeholder='Ingrese su nombre'
               className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
               value={nombre}
               required class="relative block w-full appearance-none rounded-none 
                rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

               onChange={onChange}
             />
             
             <label className='uppercase text-gray-600 block text-xl font-bold' >Email</label>
             <input
               type="email"
               id="email"
               name="email"
               placeholder='Email de Registro'
               className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
               value={email}
               required class="relative block w-full appearance-none rounded-none 
               rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

               onChange={onChange}
             />

         <label className='uppercase text-gray-600 block text-xl font-bold' >password</label>
             <input
               type="password"
               id="password"
               name="password"
               placeholder='Password de Registro'
               className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
               value={password}
               required class="relative block w-full appearance-none rounded-none 
               rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

               onChange={onChange}
             />

            <label className='uppercase text-gray-600 block text-xl font-bold' >confirmación </label>
             <input
               type="password"
               id="confirmar"
               name="confirmar"
               placeholder='Confirme su Password'
               className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
               value={confirmar}
               required class="relative block w-full appearance-none rounded-none 
               rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text sm"

               onChange={onChange}
             />
           </div>

           <input 
             type="submit"
             value="Crear Cuenta"
             className="bg-gray-500 mb-5 w-full py-3  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-500 transition-colors"

         />
         <Link 
         to={"/"}
         className="font-bold block text-center my-5 text-sky-600 uppercase text-sm"
         >Regresar</Link>

         </form>


      </div>
   </main> 
    
   
    );

}

export default CrearCuenta;