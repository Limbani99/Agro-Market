const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({ // specify the destination for uploaded files and how to name them 
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = multer({ storage: storage });