const multer = require("multer");
const path = require("path");
const domisolSalt = "domisol";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "upload/");
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});
module.exports = {
    domisolSalt,
    upload,
};
