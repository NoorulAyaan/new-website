const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl.includes("/api/parts")) {
      cb(null, "uploads/parts");
    } else {
      cb(null, "uploads/users");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;