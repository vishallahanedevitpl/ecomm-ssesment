const validate = require("./");

const addProductValidator = (body, callback) => {
  const rules = {
    productName: "required|string",
    categoryId: "numeric",
    subCategoryId: "numeric",
    productFor: "string",
    userId: "required|numeric",
  };

  return validate(body, rules, callback);
};
const updateProductValidator = (body, callback) => {
  // prettier-ignore
  const rules = {
    productName: "string|non_empty",
    categoryId: "numeric|min:1",
    subCategoryId: "numeric|min:1",
    productFor: "string|min:1",
    isActive:"boolean",
    userId: "required|min:1",
  };

  return validate(body, rules, callback);
};

const addProductDetailsValidator = (body, callback) => {
  const rules = {
    color: "required|string",
    size: "required|string",
    price: "required|numeric",
    availableStock: "required|numeric",
    productDescription: "required|string",
    discount: "numeric",
    isOnSale: "boolean",
  };

  return validate(body, rules, callback);
};
const updateProductDetailsValidator = (body, callback) => {
  const rules = {
    color: "string",
    size: "string",
    price: "numeric",
    availableStock: "numeric",
    productDescription: "string",
    discount: "numeric",
    isOnSale: "boolean",
  };

  return validate(body, rules, callback);
};

module.exports = {
  addProductValidator,
  updateProductValidator,
  addProductDetailsValidator,
  updateProductDetailsValidator,
};
