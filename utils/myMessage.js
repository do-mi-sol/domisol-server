const myResponse = require("./myResponse");

module.exports = {
  errorMsg: (res = Object, code = 500, msg = String) => {
    res.status(code).json(myResponse(false, msg));
  },
};
