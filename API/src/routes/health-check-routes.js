import wraps from "../controllers/health-check-controller.js";
import express from "express";

const router = express.Router();

router.get(
    "/",
    wraps.healthCheck
);

export default router;