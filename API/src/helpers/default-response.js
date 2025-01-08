export function successResponse(res, data, message = '', status = 200) {
    return res.status(status).json({ success: true, message, data });
};

export function errorResponse(res, message, stack, status = 500) {
    return res.status(status).json({ success: false, message, stack });
};