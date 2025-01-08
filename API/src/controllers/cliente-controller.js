import { getAllClienteService } from '../services/cliente-service.js';
import { successResponse } from '../helpers/default-response.js';
import { wrapControllers } from '../utils/wrap-controllers.js';

const getAllCliente = async (req, res) => {
  const response = await getAllClienteService(res.user.franchise);
  return successResponse(res, response.data);
};

export default wrapControllers({ getAllCliente });