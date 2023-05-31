const Categorias = require("../models/Categorias");// importar el modelo

// req lo que  se lee desde postman
// res lo que enviamos hacia postman


exports.leerCategoriaHome = async ( req, res) => {  // se crea funcion para obtener
    try{
        const categoria = await Categorias.find();

        res.json({ categoria});
    }catch(error){
        console.log(error);
    }
};
exports.leerCategoria = async ( req, res) => {  // se crea funcion para obtener
    try{
        const categoria = await Categorias.find({ creador: req.usuario.id});

        res.json({ categoria});
    }catch(error){
        console.log(error);
    }
};


exports.leerCategoriaid = async ( req, res) => {  // se crea funcion para obtener
    //parametro que se pasa
    const {id}= req.params
    
    try{
        const categoria = await Categorias.findById(id);

        res.json({ categoria});
    }catch(error){
        console.log(error);
    }
};


    // req leemos lo que viene de postman
    // res le escribimos a postman

    exports.crearCategoria = async ( req, res) => {
        // req leemos lo que viene de postman
        // res le escribimos a postman
        try{
            const categoria = new Categorias(req.body);
    
            categoria.creador = req.usuario.id;
        
            categoria.save();
        
            res.json(categoria);
        }catch(error){
            console.log(error);
        }
       
    
    };
   

exports.actualizarCategoria = async ( req, res) => { // se crea funcion para actualizar
    const { id } = req.params;
    const categoria = await Categorias.findById(id);

    if(!categoria){
        return res.status(400).json({ msg: "categoria no encontrada"});
    }
    if(categoria.creador.toString() !== req.usuario.id.toString()){
        return res.status(400).json({ msg : "acción no válida para este ususario"});
    }

    categoria.nombre = req.body.nombre || categoria.nombre;  // actualiza las propiedades
    categoria.imagen = req.body.imagen || categoria.imagen;

    categoria.save();

    res.json({ categoria});

};

exports.borrarCategoria = async ( req, res) => { // se crea funcion para borrar
    try{
        await Categorias.deleteOne({ _id: req.params.id});
        res.json({ msg: "categoria eliminada"});
    }catch(error){
        console.log(error);
    }
};