import back from './back';

class crud {  //llamado fech concatena, guarda el data de la caja arma los header  y lo envia  a la api
    async GET(resource){

          
        const token = localStorage.getItem("token");
        let bearer;
        if (token === "") {
            bearer = "";
        } else {
            bearer = `${token}`;
        }

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response



    }
    async POST(resource, body){  
      
        const token = localStorage.getItem("token"); //leer el token  guardado
        let bearer; // variable donde  se guarda el token
        if(token ===""){   // validar si existe un token
            bearer = "";
        } else {
            bearer = `${token}`;
        }
        
        
        const data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json',
                'x-auth-token': bearer  // pasarle  a la llave  la variable
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
        
    }


    async PUT(resource, body){
        const token = localStorage.getItem("token");
        let bearer;
        if(token ===""){
            bearer = "";
        } else {
            bearer = `${token}`;
        }
        
        
        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
        
    }
 



    async DELETE(resource){
        
        const token = localStorage.getItem("token");
        let bearer;
        if (token === "") {
            bearer = "";
        } else {
            bearer = `${token}`;
        }

        const data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }
}

export default new crud();