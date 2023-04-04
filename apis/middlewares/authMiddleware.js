import jwt from "jsonwebtoken";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({ where: { id: decode.id } });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized access");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

export default protect;
