const Validator = require("validatorjs");
// const  = require("validatorjs")

module.exports = (body, rules, callback, customMessages = {}) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
  Validator.register("non_empty", (value) => false, "custom validation failed");
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};
