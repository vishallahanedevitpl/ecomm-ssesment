import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import Product from "./productModel";

const ProductSize = sequelize.define(
  "ProductSize",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default ProductSize;
