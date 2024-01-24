import express from 'express';
import { check } from 'express-validator'
import { validarCampos } from '../valichecks/validar-campos.js'

import {
    actualizarCliente,
    crearCliente,
    eliminarCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarestado
} from '../controllers/clientes.js'


const router = express.Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerCliente);
router.post('/', [check('nombre', 'el campo nombre es requerido').trim().not().isEmpty(),
check('cedula', 'el campo cedula es requerido').trim().not().isEmpty(),
check('cedula', 'el campo cedula tiene que ser de 10 numeros').trim().isLength({ min: 7}),
check('telefono', 'el campo telefono es requerido').trim().not().isEmpty(),
check('telefono', 'el campo telefono tiene que tener minimo 10 numeros').trim().not().isEmpty(),
    validarCampos], crearCliente);
router.put('/:id', [check('nombre', 'el campo nombre es requerido').trim().not().isEmpty(),
check('cedula', 'el campo cedula es requerido').trim().not().isEmpty(),
check('cedula', 'el campo cedula tiene que ser de 10 numeros').trim().isLength({ min:7}),
check('telefono', 'el campo telefono es requerido').trim().not().isEmpty(),
check('telefono', 'el campo telefono tiene que tener minimo 10 numeros').trim().not().isEmpty(),
    validarCampos], actualizarCliente);
router.delete('/:id', eliminarCliente);
router.put('/estado/:id', actualizarestado);

export default router;