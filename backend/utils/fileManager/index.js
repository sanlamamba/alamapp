const fs = require("fs");
const path = require("path");

const imageRemover = async (req, res, next) => {
  console.log(req.body);
  const path = "public/images/" + req.body.image;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting image.",
        error: err,
      });
    }
    res.status(200).json({
      message: "Image deleted successfully",
    });
  });
};

const videoRemover = async (req, res, next) => {
  const path = "public/videos/" + req.body.video;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting video.",
        error: err,
      });
    }
    res.status(200).json({
      message: "Video deleted successfully",
    });
  });
};

const fileRemover = async (req, res, next) => {
  const path = "public/files/" + req.body.file;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting file.",
        error: err,
      });
    }
    res.status(200).json({
      message: "File deleted successfully",
    });
  });
};

const fileManager = {
  imageRemover,
  videoRemover,
  fileRemover,
};

export default fileManager;
