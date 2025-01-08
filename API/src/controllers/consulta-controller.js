import { createConsultaService, getAllConsultaService } from '../services/consulta-service.js';
import { successResponse } from '../helpers/default-response.js';
import { wrapControllers } from '../utils/wrap-controllers.js';

const createConsulta = async (req, res) => {
  const response = await createConsultaService(req.body, res.user.userId, res.user.franchise);
  return successResponse(res, response.data, 'Consulta criada com sucesso!');
};

const getAllConsulta = async (req, res) => {
  const response = await getAllConsultaService(res.user.userId);
  return successResponse(res, response.data, 'Consultas obtidas com sucesso!');
};

export default wrapControllers({ createConsulta, getAllConsulta });