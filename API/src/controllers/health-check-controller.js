import { successResponse } from '../helpers/default-response.js';
import { wrapControllers } from '../utils/wrap-controllers.js';
import { jwtVerify } from '../utils/jwt-auth.js';

const healthCheck = async (req, res) => {
    const response = jwtVerify(req.headers.authorization?.trim());
    if (response) successResponse(res, response);
};

export default wrapControllers({ healthCheck });