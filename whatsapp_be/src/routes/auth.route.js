import express from "express";
import trimRequest from "trim-request";

import {
  login,
  logout,
  register,
  refreshToken,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refreshToken);
router.route("/testingauthMiddleware").get(trimRequest.all, (req, res) => {
  res.send("hello");
});

export default router;
