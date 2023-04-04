import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import ProductColor from "./ProductColorModel";
import Product from "./productModel";
import ProductSize from "./productSizeModel";

const ProductPrice = sequelize.define(
  "ProductPrice",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    productSizeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductSize,
        key: "id",
      },
    },
    productColorId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductColor,
        key: "id",
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    isOnSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    availableStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default ProductPrice;
