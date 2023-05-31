const validate = require("./");

const upsertCategoryValidator = (body, callback) => {
  const rules = {
    id: "integer",
    catName: "required|string",
  };

  return validate(body, rules, callback);
};

const upsertSubCategoryValidator = (body, callback) => {
  const rules = {
    id: "integer",
    subCatName: "required|string",
    categoryId: "integer",
  };

  return validate(body, rules, callback);
};

module.exports = { upsertCategoryValidator, upsertSubCategoryValidator };
