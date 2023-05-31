module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      productFor: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    { paranoid: true }
  );

  return Product;
};
