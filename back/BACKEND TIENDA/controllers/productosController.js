const Productos = require("../models/Productos");// importar



exports.leerProductoHome = async ( req, res) => {  // se crea funcion para obtener
    try{
       // productos asi esta en el mnodelo
        const producto1 = await Productos.find(); 

        res.json({ producto1});
    }catch(error){
        console.log(error);
    }
};




exports.leerProducto = async ( req, res) => {
    const {id}= req.params;  //recibir id por parametro 
    const producto1 =await Productos.find().where("categoriaId").equals(id);
    res.json(producto1);
    //console.log(producto1)
 };
 
exports.crearProducto = async ( req, res) => {
    // req leemos lo que viene de postman
    // res le escribimos a postman
    try{
        const producto1  = new Productos (req.body);

        //producto.creador = req.usuario.id;
    
        producto1.save();
    
        res.json(producto1);
    }catch(error){
        console.log(error);
    }
   

};






exports.actualizarProducto = async ( req, res) => { // se crea funcion para actualizar
    const { id } = req.params;
    //const producto = await Productos.findById(id);
    const producto1 =await Productos.findById().where("_id").equals(id);
    
    //console.log(producto1.creador)
    if(!producto1){
        return res.status(400).json({ msg: "producto no encontrado"});
    }
    /* if(producto1.creador.toString() !== req.usuario.id.toString()){
        return res.status(400).json({ msg : "acción no válida para este usuario"});
    } */

    producto1.nombre = req.body.nombre || producto1.nombre;
    producto1.descripcion = req.body.descripcion || producto1.descripcion;
    producto1.stock = req.body.stock || producto1.stock;
    producto1.precio = req.body.precio || producto1.precio;
    producto1.imagen = req.body.imagen || producto1.imagen;

    producto1.save();

    res.json({ producto1});

};



exports.borrarProducto = async ( req, res) => {
    try{
        await Productos.deleteOne({ _id: req.params.id});
        res.json({ msg: "producto eliminado"});
    }catch(error){
        console.log(error);
    }
};