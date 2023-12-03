// Importaciones de módulos
import express from "express";
import passwordResetController from "../controllers/passwordReset.controller.js";
import { passportCall } from "../middlewares/authorization.js";

// Creación del router
const router = express.Router();

// Rutas
router.post("/request-reset", passwordResetController.requestReset);
router.get("/reset/:token", passwordResetController.verifyToken);
router.post("/reset/:token", passportCall, passwordResetController.resetPassword);

// Exportación del router
export default router;
