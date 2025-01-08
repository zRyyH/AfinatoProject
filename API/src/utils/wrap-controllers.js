const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const wrapControllers = (controllers) => {
    return Object.keys(controllers).reduce((wrapped, key) => {
        wrapped[key] = asyncHandler(controllers[key]);
        return wrapped;
    }, {});
};

export const wrapController = (controller) => {
    return asyncHandler(controller);
};