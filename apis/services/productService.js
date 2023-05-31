const db = require("../models");
const Product = db.products;
const ProductColor = db.productColors;
const ProductSize = db.productSizes;
const ProductVariant = db.productVariants;

const getFullProductByPVID = async (variantId) => {
  const product = await ProductVariant.findByPk(variantId, {
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    include: [
      {
        model: Product,
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      },
      {
        model: ProductColor,
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      },
      {
        model: ProductSize,
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      },
    ],
  });

  return product;
};

module.exports = { getFullProductByPVID };
