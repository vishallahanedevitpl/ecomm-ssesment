module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define(
    "productColor",
    {
      productId: {
        type: DataTypes.INTEGER,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true }
  );

  return ProductColor;
};
