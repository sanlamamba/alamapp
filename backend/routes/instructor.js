import express from "express";
import requireToken from "../middlewares/requireToken";
const ENDPOINT = "instructor";
const router = express.Router();

const instructorController = require("../controllers/instructor");

router.post(
  `/${ENDPOINT}/become-instructor`,
  requireToken,
  instructorController.becomeInstructor
);
router.post(
  `/${ENDPOINT}/current-instructor`,
  requireToken,
  instructorController.currentInstructor
);
router.post(
  `/${ENDPOINT}/instructor-courses`,
  requireToken,
  instructorController.instructorCourses
)

module.exports = router;
