import slugify from "slugify";

const multer = require("multer");

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, "public/images/");
      } else if (file.mimetype === "video/mp4") {
        cb(null, "public/videos/");
      } else {
        cb(null, "public/files/");
      }
    },
    filename: (req, file, cb) => {
      cb(null, slugify(Date.now() + " - " + file.originalname, { lower: true }));
    },
  }),
};

export default multerConfig;
