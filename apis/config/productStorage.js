const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  //Destination for file upload
  destination: function (req, res, cb) {
    const path = `.${process.env.PROFILE_PIC_UPLOAD_DIR}/products/${
      req.product.product.id
    }-${req.product.product.productName.replace(/([^\w ]|_|\s)/g, "-")}`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  //unique file name for image
  filename: function (req, file, cb) {
    const imageName = `${Date.now()}${path.extname(file.originalname)}`;
    return cb(null, imageName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg .jpeg and .webp format allowed!"));
    }
  },
}).single("picture");

module.exports = { handleMultipartData };
