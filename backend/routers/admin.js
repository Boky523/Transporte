import express from 'express';
import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import {
obtenerAdmins,
obtenerAdmin,
CrearAdmin,
ActualizarAdmin,
EliminarAdmin,
loginadmin
} from '../controllers/admin.js';

const router = express.Router();


router.post("/login",loginadmin)
router.get('/', obtenerAdmins);
router.get('/:id',obtenerAdmin);
router.post('/',CrearAdmin);
router.put('/:id', ActualizarAdmin);
router.delete('/:id', EliminarAdmin);

export default router;

// check("nombre").not().isEmpty()
// check("nombre").not().isEmpty()
// router.post('/',[    
//     validarJWT,
//  check('place').not().isEmpty(),
//     validarRol('GUARDA','BIBLIOTECARIA','ADMIN'), 
//     check('place').not().isEmpty(),
//     check('place', 'No es un ID válido').isMongoId(),
//     check('place').custom(helpersHolder.existeHolderById),
//     check('laptop').not().isEmpty(),
//     check('holder', 'No es un ID válido').isMongoId(),
//     check('holder').custom(helpersHolder.existeHolderById), 
//     check('documentlearner').custom(helpersHolder.existeHolderByDocument), 
//     validarCampos       
// ], entryHttp.entryPost);
