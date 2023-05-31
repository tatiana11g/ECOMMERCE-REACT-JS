const express = require("express");
const conectarDB = require("./config/db"); 
const usuarioRoutes = require("./routes/usuarioRoutes");
const auth = require("./routes/auth");
const categoriasRouters = require("./routes/categoriasRouters");// importar
const productosRouters = require("./routes/productosRouters"); // importar
const cors = require("cors");

//conectar a la base de datos
conectarDB();

const app = express();
//habilitar los cors
app.use(cors());
// habilitar express.json
app.use(express.json({ extended : true }));
//rutas o routes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", auth );
app.use("/api/categorias", categoriasRouters);
app.use("/api/productos", productosRouters);


app.listen(4000, () =>{
    console.log("servidor corriendo en el puerto 4000");
});