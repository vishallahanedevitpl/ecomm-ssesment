import jwt from "jsonwebtoken";

export const verifyEmailToken = async (token, res) => {
  jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
    if (err) {
      console.log(err.message);
      res.send(
        "Email verification failed, possibly the link is invalid or expired"
      );
    } else {
      res.send("Email verified successfully");
    }
  });
};
