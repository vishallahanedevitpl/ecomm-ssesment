import jwt from "jsonwebtoken";

export const genrateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const genrateEmailVerifucationToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
