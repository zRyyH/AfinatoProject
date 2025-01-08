import { authMiddleware } from "../middleware/auth-middleware.js";
import wraps from "../controllers/cliente-controller.js";
import express from "express";

const router = express.Router();

router.get(
    "/all",
    authMiddleware,
    wraps.getAllCliente
);

export default router;