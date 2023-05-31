const checkRole = async (req, res, next) => {
  console.log("Role checked", req.originalUrl);
  next();
};

module.exports = checkRole;
