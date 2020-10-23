const multer = require("multer");
const domisolSalt = "domisol";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("file");

module.exports = {
    domisolSalt,
    upload,
};
