import { Router } from "express";
import {
  emailVerification,
  login,
  passwordResetRequest,
  register,
  resetPassword,
  uploadProfilePic,
  verifyEmail,
} from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/sendVerification", emailVerification);
userRouter.get("/verifyEmail/:token", verifyEmail);
userRouter.post("/passwordResetLink", passwordResetRequest);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/uploadProfilePic", protect, uploadProfilePic);

export default userRouter;
