import express from "express";
import bcrypt from "bcrypt";
import config from "config";
import AES from "crypto-js/aes.js";
import randomstring from "randomstring";
//Import Models
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import generateAccessToken from "../../helpers/accessTokenGenerator.js";

import {
  userLoginValidationRules,
  errorMiddleware,
} from "../../middlewares/validations/index.js";

/*
    API EndPoint : /api/auth/login
    Method : POST
    Payload : Request.Body - email,password
    Access Type : Public
    Validations : 
        a) Check Valid Email and verify if password is the same
    Description : User Login 
*/

router.post(
  "/login",
  userLoginValidationRules(),
  errorMiddleware,
  async (req, res, next) => {
    try {
      console.log(req.body);
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "Invalid Credentials" });
      }
      let correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      let payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      };
      const cipherToken = generateAccessToken(payload);
      res.status(200).json({ cipherToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error" });
    }
  }
);

export default router;