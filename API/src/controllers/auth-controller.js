import { successResponse } from '../helpers/default-response.js';
import { wrapControllers } from '../utils/wrap-controllers.js';
import { authService } from '../services/auth-service.js';

const authController = async (req, res) => {
    const response = await authService(req.body);
    return successResponse(res, response, 'Autenticado com sucesso!');
};

export default wrapControllers({ authController });