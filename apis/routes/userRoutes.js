const { Router } = require("express");
const {
  emailVerification,
  login,
  passwordResetRequest,
  register,
  resetPassword,
  verifyEmail,
  updateUserProfilePic,
  updateUserProfileDetails,
  changePassword,
  listUsers,
  getSingleUser,
  updateUserProfileDetailsByAdmin,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const userRouter = Router();
//prefix => /user
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/sendVerification", emailVerification);
userRouter.get("/verifyEmail/:token", verifyEmail);
userRouter.post("/passwordResetLink", passwordResetRequest);
userRouter.post("/resetPassword", resetPassword);
userRouter.patch("/updateProfilePic", protect, updateUserProfilePic);
userRouter.patch("/updateProfileDetails", protect, updateUserProfileDetails);
userRouter.patch("/changePassword", protect, changePassword);
userRouter.get("/list", protect, listUsers);
userRouter.get("/singleUser/:id", protect, getSingleUser);
userRouter.patch(
  "/updateProfileDetailsByAdmin/:id",
  protect,
  updateUserProfileDetailsByAdmin
);

module.exports = userRouter;
