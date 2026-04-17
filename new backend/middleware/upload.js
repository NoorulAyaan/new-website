const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    // ✅ ABSOLUTE BASE PATH
    const basePath = path.join(__dirname, "..", "uploads");

    // ✅ PARTS IMAGES
    if (req.originalUrl.includes("/api/parts")) {
      cb(null, path.join(basePath, "parts"));
    }

    // ✅ RECEIPTS
    else if (req.originalUrl.includes("/api/orders")) {
      cb(null, path.join(basePath, "receipts"));
    }

    // ✅ USER PROFILE
    else {
      cb(null, path.join(basePath, "users"));
    }
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;