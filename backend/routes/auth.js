import express from "express";
import requireToken from "../middlewares/requireToken";
const ENDPOINT = "auth";
const router = express.Router();

const authController = require("../controllers/auth");

router.post(`/${ENDPOINT}/register`, authController.register);
router.post(`/${ENDPOINT}/login`, authController.login);
router.get(`/${ENDPOINT}/logout`, authController.logout);
router.post(
  `/${ENDPOINT}/current-user`,
  requireToken,
  authController.currentUser
);

module.exports = router;
