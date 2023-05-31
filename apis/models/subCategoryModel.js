module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    "subCategory",
    {
      categoryId: {
        type: DataTypes.INTEGER,
      },
      subCatName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subCatImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
    }
  );

  return SubCategory;
};
