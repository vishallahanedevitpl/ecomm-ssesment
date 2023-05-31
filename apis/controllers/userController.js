const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  sendAccountVerificationMail,
  sendPasswordResetLink,
} = require("../config/emailConfig");
const { genrateToken } = require("../config/generateToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { handleMultipartData } = require("../config/profilePicStorage");
const db = require("../models");
const {
  getSingleUserDetailsByEmail,
  buildResponse,
} = require("../services/commonService");
const fs = require("fs");
const {
  registrationFormValidator,
  loginFormValidator,
  emailVerificationValidator,
  resetPasswordValidator,
  userDetailsValidator,
  changePassowrdValidator,
} = require("../validations/userValidations");
const { FAILURE, SUCCESS } = require("../costants/responseStatus");

//Table instances
const User = db.users;
const Token = db.tokens;
const Role = db.roles;

//function for User registration
const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, roleId } = req.body;

  //Validate input data
  await registrationFormValidator(req.body, (err, status) => {
    if (!status) {
      return buildResponse(res, FAILURE, "Validation failed", err.errors);
    }
  });

  //User Creation
  const user = await User.create({ name, email, password, roleId });

  //send account verification link through mail to newly registered user
  sendAccountVerificationMail(email);

  //Send response
  return buildResponse(res, SUCCESS, "User Registered successfull", user);
});

//function for User authentication
const login = expressAsyncHandler(async (req, res) => {
  //Validate input data
  await loginFormValidator(req.body, (err, status) => {
    if (!status) {
      return buildResponse(res, FAILURE, "Validation failed", err.errors);
    }
  });

  //Destruct data
  const { email, password } = req.body;
  //fetch user's details using email
  const user = await getSingleUserDetailsByEmail(email, true);
  //check for user existance
  if (!user) {
    return buildResponse(res, FAILURE, "User not found");
  }

  //check for is user verified or not
  if (!user.isVerified) {
    return buildResponse(res, FAILURE, "Account is not verified");
  }

  //compare passwords
  if (user && (await user.validPassword(password))) {
    const userSend = user.dataValues;
    delete userSend.password;
    userSend.accessToken = genrateToken(user.email);
    return buildResponse(res, SUCCESS, "Login successfull", userSend);
  } else {
    return buildResponse(res, FAILURE, "Wrong Credentials");
  }
});
//function for user verification
const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    //Verify Token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getSingleUserDetailsByEmail(decode.email);
    if (!user) {
      return buildResponse(res, FAILURE, "User not found");
    }
    //Update user status in DB
    user.update({ isVerified: true });

    return buildResponse(res, SUCCESS, "Email verified successfully");
  } catch (error) {
    return buildResponse(
      res,
      FAILURE,
      "Verification link expired. Please try with new link"
    );
  }
});

//function for sending verification mail to user
const emailVerification = expressAsyncHandler(async (req, res) => {
  //Validate Input
  await emailVerificationValidator(req.body, (err, status) => {
    if (!status) {
      return buildResponse(res, FAILURE, "Validation failed", err.errors);
    }
  });

  //Destructing the data
  const { email } = req.body;

  //Check for user existance
  const user = await getSingleUserDetailsByEmail(email);
  if (!user) {
    return buildResponse(res, FAILURE, "User not found");
  }

  await sendAccountVerificationMail(email);
  return buildResponse(res, SUCCESS, "Verification link sent successfully");
});

//function for sending password reset link
const passwordResetRequest = expressAsyncHandler(async (req, res) => {
  //Validate Input
  await emailVerificationValidator(req.body, (err, status) => {
    if (!status) {
      return buildResponse(res, FAILURE, "Validation failed", err.errors);
    }
  });
  const { email } = req.body;
  //Check for user existance
  const user = await getSingleUserDetailsByEmail(email);
  if (!user) {
    return buildResponse(res, FAILURE, "User not found");
  }
  //Find for existing token and delete it to avoid conflicts
  const token = await Token.findOne({ where: { userId: user.id } });
  if (token) {
    await token.destroy();
  }

  //Generate new token and save to DB
  const resetToken = crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(10, "a");
  const hash = await bcrypt.hash(resetToken, salt);

  const newToken = await Token.create({ userId: user.id, token: hash });

  const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user.id}`;
  //Send reset link mail
  await sendPasswordResetLink(user.email, link);
  return buildResponse(res, SUCCESS, "Password link sent successfully");
});

//function for resetting password
const resetPassword = expressAsyncHandler(async (req, res) => {
  //Validate Input
  await resetPasswordValidator(req.body, (err, status) => {
    if (!status) {
      return buildResponse(res, FAILURE, "Validation failed", err.errors);
    }
  });
  const { userId, token, password } = req.body;

  //Check user existance
  const user = await User.findByPk(userId);
  if (!user) {
    return buildResponse(res, FAILURE, "User not found, Please try again");
  }

  //Get Token for user
  const resetToken = await Token.findOne({ where: { userId } });
  if (!resetToken) {
    return buildResponse(
      res,
      FAILURE,
      "Password reset link not working please get new link"
    );
  }

  //campare saved token and token from request
  const isValid = await bcrypt.compare(token, resetToken.token);
  if (!isValid) {
    return buildResponse(
      res,
      FAILURE,
      "Password reset link not working please get new link"
    );
  }
  //update user's password
  await user.update({ password: password });

  //delete token's entry to avoid future conflicts
  await resetToken.destroy();
  return buildResponse(res, SUCCESS, "Password updated successfully");
});

//function for updating user's profile picture
const updateUserProfilePic = expressAsyncHandler(async (req, res) => {
  if (req.user.profilePic) {
    fs.unlinkSync(`.${req.user.profilePic}`);
  }
  handleMultipartData(req, res, async (err) => {
    if (err) {
      return buildResponse(res, FAILURE, err.message);
    }
    const user = req.user;
    //Update profile picture path in DB
    await user.update({
      profilePic: `/${req.file.path.replace(/\\/g, "/")}`,
    });
    delete user.updatedAt;
    return buildResponse(
      res,
      SUCCESS,
      "User's profile pic updated successfully"
    );
  });
});

//Function is for updating the profile details
const updateUserProfileDetails = expressAsyncHandler(async (req, res) => {
  // validate incoming data
  await userDetailsValidator(req.body, (err, status) => {
    if (!status) {
      return buildResponse(res, FAILURE, "Validation failed", err.errors);
    }
  });

  const { name, mobileNo, dob, gender, hobbies, isActive, roleId } = req.body;
  const user = req.user;
  try {
    await user.update({
      name,
      mobileNo,
      dob,
      gender,
      hobbies,
      isActive,
      roleId,
    });

    // const updatedUser = await getSingleUserDetailsByEmail(user.email);
    return buildResponse(res, SUCCESS, "Profile updated successfully", user);
  } catch (error) {
    return buildResponse(res, FAILURE, "Profile details are not updated");
  }
});

//function for updating password using existing password
const changePassword = expressAsyncHandler(async (req, res) => {
  try {
    // validate incoming data
    await changePassowrdValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });
    const { current, password } = req.body;
    const user = req.user;
    //confirm existing password is valid and update with new one
    if (await user.validPassword(current)) {
      await user.update({ password });
      return buildResponse(res, SUCCESS, "Password changed successfully");
    } else {
      return buildResponse(
        res,
        FAILURE,
        "Current password is not matched with password you entered"
      );
    }
  } catch (error) {
    return buildResponse(res, FAILURE, "Password not updated");
  }
});

//function to get user list
const listUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.findAndCountAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
      include: {
        model: Role,
        foreignKey: "roleId",
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      },
    });
    return buildResponse(res, SUCCESS, "User fetched", users);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

//function to get user details
const getSingleUser = expressAsyncHandler(async (req, res) => {
  try {
    //Check user existance
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return buildResponse(res, FAILURE, "User not found, Please try again");
    }

    return buildResponse(res, SUCCESS, "User found", user);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
//Function to update user details from different user
const updateUserProfileDetailsByAdmin = expressAsyncHandler(
  async (req, res) => {
    try {
      // validate incoming data
      await userDetailsValidator(req.body, (err, status) => {
        if (!status) {
          return buildResponse(res, FAILURE, "Validation failed", err.errors);
        }
      });

      const { name, mobileNo, dob, gender, hobbies, isActive, roleId } =
        req.body;
      //Check user existance
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return buildResponse(res, FAILURE, "User not found, Please try again");
      }
      await user.update({
        name,
        mobileNo,
        dob,
        gender,
        hobbies,
        isActive,
        roleId,
      });

      // const updatedUser = await getSingleUserDetailsByEmail(user.email);
      return buildResponse(res, SUCCESS, "Profile updated successfully", user);
    } catch (error) {
      return buildResponse(res, FAILURE, "Profile details are not updated");
    }
  }
);
module.exports = {
  emailVerification,
  login,
  passwordResetRequest,
  register,
  resetPassword,
  updateUserProfileDetails,
  updateUserProfilePic,
  verifyEmail,
  changePassword,
  listUsers,
  getSingleUser,
  updateUserProfileDetailsByAdmin,
};
