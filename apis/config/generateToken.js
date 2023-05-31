const jwt = require("jsonwebtoken");

const genrateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const genrateEmailVerificationToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  genrateToken,
  genrateEmailVerificationToken,
};
