exports.createValidationResponse = (res, errors) => {
    return res.status(400).json({
        status: 400,
        message: errors[Object.keys(errors)?.[0]],
        errors: { ...errors },
    });
};

exports.createResponse = (res, status, message, data, statusCode) => {
    console.log(data)
    return res.status(status).json({ status: statusCode, message, data });
};

exports.createError = (res, status, message) => {
    return res.status(status).json({ message, status });
};

exports.decodeJwt = (token) => {
    return JSON.parse(atob(token?.split(".")?.[1]));
};

exports.decodeToken = (headers) => {
    const token = headers["authorization"]?.split(" ");
    if (token) return this.decodeJwt(token?.[1]);
    else return null;
};
