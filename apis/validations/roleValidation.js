const validate = require("./");

const addRoleValidator = (body, callback) => {
  const rules = {
    roleName: "required|string",
    "permissions.*": "string",
  };

  return validate(body, rules, callback);
};

const updateRoleValidator = (body, callback) => {
  const rules = {
    roleName: "string",
    "permissions.*": "string",
  };
};

module.exports = { addRoleValidator, updateRoleValidator };
