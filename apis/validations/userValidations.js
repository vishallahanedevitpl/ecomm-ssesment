const validate = require("./");
const registrationFormValidator = (body, callback) => {
  const rules = {
    name: "required",
    email: "required|email",
    password: "required|min:6",
  };

  const customMessages = {
    "required.email": "Without an :attribute we can't reach you!",
  };

  return validate(body, rules, callback, customMessages);
};

const loginFormValidator = (body, callback) => {
  const rules = {
    email: "required|email",
    password: "required",
  };
  return validate(body, rules, callback);
};

const emailVerificationValidator = (body, callback) => {
  const rules = {
    email: "required|email",
  };
  return validate(body, rules, callback);
};

const resetPasswordValidator = (body, callback) => {
  const rules = {
    password: "required|min:6",
  };
  return validate(body, rules, callback);
};

const userDetailsValidator = (body, callback) => {
  const rules = {
    name: "string",
    mobileNo: "digits:10",
    dob: "date",
    gender: "in:male,female",
    hobbies: "string",
    isActive: "boolean",
    roleId: "numeric",
  };

  return validate(body, rules, callback);
};

const changePassowrdValidator = (body, callback) => {
  const rules = {
    current: "required",
    password: "required|min:6|confirmed",
  };

  return validate(body, rules, callback);
};
module.exports = {
  registrationFormValidator,
  loginFormValidator,
  emailVerificationValidator,
  resetPasswordValidator,
  userDetailsValidator,
  changePassowrdValidator,
};
