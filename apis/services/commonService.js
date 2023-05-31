const db = require("../models");

const User = db.users;
const Role = db.roles;

const sendResponse = (res, data) => {
  return res.json(data);
};
const buildResponse = (res, status, message, result) => {
  return res.json({ status, message, result });
};

const getSingleUserDetailsByEmail = async (email, selPswd = false) => {
  return await User.findOne({
    where: { email },
    attributes: {
      exclude: selPswd
        ? ["createdAt", "updatedAt", "deletedAt"]
        : ["password", "createdAt", "updatedAt", "deletedAt"],
    },
    include: {
      model: Role,
      foreignKey: "roleId",
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    },
  });
};
module.exports = { sendResponse, buildResponse, getSingleUserDetailsByEmail };
