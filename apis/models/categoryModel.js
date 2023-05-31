module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      catName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
    }
  );

  return Category;
};
