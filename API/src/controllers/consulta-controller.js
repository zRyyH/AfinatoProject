import { createConsultaService, getAllConsultaService, deleteConsultaService, editConsultaService } from '../services/consulta-service.js';
import { successResponse } from '../helpers/default-response.js';
import { wrapControllers } from '../utils/wrap-controllers.js';

const createConsulta = async (req, res) => {
  const response = await createConsultaService(req.body, res.user);
  return successResponse(res, response.data, 'Consulta criada com sucesso!');
};

const deleteConsulta = async (req, res) => {
  const response = await deleteConsultaService(req.body, res.user);
  return successResponse(res, response.data, 'Consulta deletada com sucesso!');
};

const editConsulta = async (req, res) => {
  console.log(req.body, res.user)
  const response = await editConsultaService(req.body, res.user);
  return successResponse(res, response.data, 'Consulta atualizada com sucesso!');
};

const getAllConsulta = async (req, res) => {
  const response = await getAllConsultaService(res.user);
  return successResponse(res, response.data, 'Consultas obtidas com sucesso!');
};

export default wrapControllers({ createConsulta, deleteConsulta, getAllConsulta, editConsulta });