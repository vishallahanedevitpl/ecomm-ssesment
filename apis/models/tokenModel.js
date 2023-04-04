import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./userModel";

const Token = sequelize.define(
  "Token",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
// (async () => {
//   await Token.sync({ alter: true });
//   // Code here
// })();

export default Token;
