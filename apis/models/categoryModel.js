import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./userModel";

const Category = sequelize.define(
  "Category",
  {
    catName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);
// (async () => {
//   await Category.sync({ alter: true });
//   // Code here
// })();
export default Category;
