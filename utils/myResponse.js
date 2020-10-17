module.exports = (success = false, message = "", databox = "data", data = null) => {
    return {
        success,
        message,
        [databox]: data,
    };
};
