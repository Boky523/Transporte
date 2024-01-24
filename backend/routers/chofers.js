import express from 'express';
import {
  obtenerConductores,
  obtenerConductor,
  crearConductor,
  actualizarConductor,
  eliminarConductor,
  actualizarestado
} from '../controllers/chofers.js';

const router = express.Router();

// Rutas para los conductores
router.get('/', obtenerConductores);
router.get('/:id', obtenerConductor);
router.post('/', crearConductor);
router.put('/:id', actualizarConductor);
router.put('/estado/:id', actualizarestado);
router.delete('/:id', eliminarConductor);

export default router;
