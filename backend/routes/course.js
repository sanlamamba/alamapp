import express from "express";
import { isInstructor } from "../middlewares/isInstructor";
import requireToken from "../middlewares/requireToken";
import fileManager from "../utils/fileManager";
import multerConfig from "../utils/multer/multerConfig";

const { imageRemover, videoRemover, fileRemover } = fileManager;

const ENDPOINT = "course";
const router = express.Router();
const multer = require("multer");

const upload = multer(multerConfig);

const courseController = require("../controllers/course");

router.post(
  `/${ENDPOINT}/upload-image`,
  upload.single("image"),
  courseController.uploadImage
);

router.post(
  `/${ENDPOINT}/remove-image`,
  imageRemover,
  courseController.removeImage
);
router.post(
  `/${ENDPOINT}/upload-video`,
  upload.single("video"),
  courseController.uploadVideo
);
router.post(
  `/${ENDPOINT}/remove-video`,
  requireToken,
  isInstructor,
  videoRemover,
  courseController.removeVideo
);

router.post(
  `/${ENDPOINT}/view`,
  requireToken,
  isInstructor,
  courseController.viewCourse
);

router.post(
  `/${ENDPOINT}/create-course`,
  requireToken,
  isInstructor,
  courseController.createCourse
);
router.post(
  `/${ENDPOINT}/update-course/:slug`,
  requireToken,
  isInstructor,
  courseController.updateCourse
);

router.post(
  `/${ENDPOINT}/lesson/:slug`,
  requireToken,
  isInstructor,
  courseController.createLesson
);

module.exports = router;
