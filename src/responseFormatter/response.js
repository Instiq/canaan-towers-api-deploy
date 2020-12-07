
exports.success = (data) => {
    return {
        status: 'success', 
        message: 'ok',
        data
    };
};



exports.error = (statusmessage, message) => {
    return {
        status: statusmessage,
        message
    };
};

exports.errorUnauthorized = (message) => {
    return {
        message
    };
};
 
exports.validation = (errors) => {
return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors
};
};