import express from 'express';
import { ExpressValidator } from "express-validator";
import {validarCampos} from "../valichecks/validar-campos.js"
import { check } from 'express-validator'
import {
  obtenerVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  actualizarVencimientoSeguro,
  actualizarNumeroLicenciaTransito,
  actualizarestado
} from '../controllers/vehiculos.js';

const router = express.Router();

// Rutas para los vehículos
router.get('/', obtenerVehiculos);
router.get('/:id', obtenerVehiculo);
router.post('/', [
check('placa_vehiculo', 'el campo placa_vehiculo es requerido').trim().not().isEmpty(),
check('cantidad_puestos', 'el campo cantidad_puestos es requerido').trim().not().isEmpty(),
check('marca', 'el campo marca es requerido').trim().not().isEmpty(),
check('modelo', 'el campo modelo es requerido').trim().not().isEmpty(),
validarCampos
],crearVehiculo);
router.put('/:id', actualizarVehiculo);
router.put('/estado/:id', actualizarestado);
router.delete('/:id', eliminarVehiculo);

// Ruta para actualizar la fecha de vencimiento del seguro de un vehículo
router.put('/:id/seguro', actualizarVencimientoSeguro);

// Ruta para actualizar el número de licencia de tránsito de un vehículo
router.put('/:id/licencia', actualizarNumeroLicenciaTransito);

export default router;