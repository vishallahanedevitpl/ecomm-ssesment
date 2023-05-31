module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define(
    "productSize",
    {
      productId: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true }
  );

  return ProductSize;
};
