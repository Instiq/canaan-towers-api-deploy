const errorout = (statusmessage, message) => {
    return {
        status: statusmessage,
        message: message
    };
};


const success = (data) => {
    return {
        status: 'success', 
        message: 'ok',
        data
    };
};

const errorUnauthorized = (message) => {
    return {
        message
    };
};

const validation = (errors) => {
return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors
};
};

module.exports = { errorout, success, errorUnauthorized, validation }