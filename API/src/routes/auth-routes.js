import { validationMiddleware } from '../middleware/validation-middleware.js';
import { authSchema } from '../validators/auth-validator.js';
import wraps from '../controllers/auth-controller.js';
import express from 'express';

const router = express.Router();

router.post(
    "/",
    validationMiddleware(authSchema),
    wraps.authController
);

export default router;