import expressAsyncHandler from "express-async-handler";
import {
  sendAccountVerificationMail,
  sendPasswordResetLink,
} from "../config/emailConfig";
import { genrateToken } from "../config/generateToken";
import { verifyEmailToken } from "../middlewares/emailVerification";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Token from "../models/tokenModel";
import User from "../models/userModel";
import multer from "multer";
import { handleMultipartData } from "../config/storage";

export const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  sendAccountVerificationMail(email);
  res.status(201).json({
    id: user.id,
    name: user.name,
    profilePic: user.profilePic,
    isSeller: user.isSeller,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
  });
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user && (await user.validPassword(password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      profilePic: user.profilePic,
      isSeller: user.isSeller,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      accessToken: genrateToken(user.email),
    });
  } else {
    res
      .status(404)
      .json({ message: "It seems that you have entered wrong credentials" });
  }
});

export const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;
  const decode = await verifyEmailToken(token, res);
});

export const emailVerification = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  await sendAccountVerificationMail(email);
  res.status(200).json({ message: "Sent" });
});

export const passwordResetRequest = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const token = await Token.findOne({ where: { userId: user.id } });
  if (token) {
    await token.destroy();
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(10, "a");
  const hash = await bcrypt.hash(resetToken, salt);

  const newToken = await Token.create({ userId: user.id, token: hash });

  const link = `http://localhost:3000/passwordReset?token=${resetToken}&id=${user.id}`;

  sendPasswordResetLink(user.email, link);
  res.status(200).json({ message: "Check your email for reset link" });
});

export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { userId, token, password } = req.body;

  const resetToken = await Token.findOne({ where: { userId: userId } });

  if (!resetToken) {
    res.status(404).json({ message: "Token not found" });
  }

  const isValid = await bcrypt.compare(token, resetToken.token);

  if (!isValid) {
    res.status(404).json({ message: "Token not valid" });
  }
  const user = await User.findOne({ where: { id: userId } });
  await user.update({ password: password });

  await resetToken.destroy();
  res.status(200).json({ message: "Password updated successfully" });
});

export const uploadProfilePic = expressAsyncHandler(async (req, res) => {
  handleMultipartData(req, res, async (err) => {
    if (err) {
      res.json({ msgs: err.message });
    }

    res.json({
      body: req.body,
      file: req.file,
    });
  });
});
