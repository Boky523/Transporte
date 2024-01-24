import express from "express";
import clienteruta from './clientes.js'
import rutaRouter from "./rutas.js";
import tiketRouter from "./tikects.js";
import vehiculoRouter from "./vehiculos.js";
import chofersRouter from "./chofers.js";
import adminrouter from "./admin.js"

const router = express.Router();

router.use('/cliente', clienteruta)
router.use("/rutas", rutaRouter);
router.use("/tikets", tiketRouter);
router.use("/vehiculos", vehiculoRouter);
router.use("/conductor", chofersRouter);
router.use("/admin", adminrouter )

export default router;

