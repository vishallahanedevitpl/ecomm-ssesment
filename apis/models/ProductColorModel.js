import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import Product from "./productModel";

const ProductColor = sequelize.define(
  "ProductColor",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default ProductColor;
