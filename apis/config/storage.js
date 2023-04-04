import multer from "multer";
import path from "path";
export const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

export const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("profilePic");
