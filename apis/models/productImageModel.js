module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "productImage",
    {
      productVariantId: {
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
  return ProductImage;
};
