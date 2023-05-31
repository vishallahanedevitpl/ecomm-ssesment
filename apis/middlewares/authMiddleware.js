const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const {
  getSingleUserDetailsByEmail,
  sendResponse,
  buildResponse,
} = require("../services/commonService");
const { FAILURE } = require("../costants/responseStatus");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //fetch user details and move to next
      const user = await getSingleUserDetailsByEmail(decode.email);
      //If user is not found then send error message
      if (!user) {
        return buildResponse(res, FAILURE, "User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      return buildResponse(
        res,
        401,
        "Unauthorized Access, Token expired. Please login"
      );
    }
  }

  if (!token) {
    return buildResponse(
      res,
      401,
      "Unauthorized Access, Token expired. Please login"
    );
  }
});

module.exports = protect;
