const myResponse = require("./myResponse");

module.exports = {
    errorMsg: (res = Object, msg = String) => {
        res.send(myResponse(false, msg));
    },
};
