import { createConsultaSchema, getAllConsultaSchema, deleteConsultaSchema, editConsultaSchema } from "../validators/consulta-validator.js";
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


router.delete(
    "/",
    authMiddleware,
    validationMiddleware(deleteConsultaSchema),
    wraps.deleteConsulta
);


router.put(
    "/",
    authMiddleware,
    validationMiddleware(editConsultaSchema),
    wraps.editConsulta
);


export default router;