module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define(
    "productVariant",
    {
      productId: {
        type: DataTypes.INTEGER,
      },
      productSizeId: {
        type: DataTypes.INTEGER,
      },
      productColorId: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      isOnSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      availableStock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      productDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
  return ProductVariant;
};
