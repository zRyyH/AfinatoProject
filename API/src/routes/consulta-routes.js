import { createConsultaSchema, getAllConsultaSchema } from "../validators/consulta-validator.js";
import { validationMiddleware } from "../middleware/validation-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import wraps from "../controllers/consulta-controller.js";
import express from "express";


const router = express.Router();


router.post(
    "/",
    authMiddleware,
    validationMiddleware(createConsultaSchema),
    wraps.createConsulta
);


router.get(
    "/all",
    authMiddleware,
    validationMiddleware(getAllConsultaSchema),
    wraps.getAllConsulta
);


export default router;