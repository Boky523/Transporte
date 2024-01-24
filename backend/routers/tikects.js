import express from 'express';
import { ExpressValidator } from "express-validator";
import {
  obtenerTickets,
  obtenerTicket,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  traigotiket

} from '../controllers/tikects.js';

const router = express.Router();

// Rutas para los tickets
router.get('/', obtenerTickets);
router.get('/t', traigotiket);
router.get('/:id', obtenerTicket);
router.post('/', crearTicket);
router.put('/:id', actualizarTicket);
router.delete('/:id', eliminarTicket);

export default router;
