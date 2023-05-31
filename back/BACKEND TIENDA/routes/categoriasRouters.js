const express = require("express");
const router = express.Router();
const authMidd = require("../middleware/authMidd"); // importar el archivo
const categoriasController = require("../controllers/categoriasController");// importar el archivo


router.get("/home", categoriasController.leerCategoriaHome); 

router.get("/", authMidd, categoriasController.leerCategoria);  //llamar  las funciones  
router.get("/:id", authMidd, categoriasController.leerCategoriaid);
//se llama  la capa de seguridad  authMiid que autentica y luego a la funcion del controlador
router.post("/", authMidd,categoriasController.crearCategoria );
router.put("/:id", authMidd, categoriasController.actualizarCategoria);
router.delete("/:id",authMidd,categoriasController.borrarCategoria );

// definir las rutas
module.exports = router;
