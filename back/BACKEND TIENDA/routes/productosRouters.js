const express = require("express");
const router = express.Router();
const authMidd = require("../middleware/authMidd");
const productosController = require("../controllers/productosController");


router.get("/home", productosController.leerProductoHome); 
router.get("/:id",authMidd, productosController.leerProducto );//llamar  las funciones  
//se llama  la capa de seguridad  authMiid que autentica y luego a la funcion del controlador
router.post("/",authMidd,productosController.crearProducto );
router.put("/:id",authMidd, productosController.actualizarProducto );
router.delete("/:id" ,authMidd,productosController.borrarProducto);

// definir las rutas
module.exports = router;