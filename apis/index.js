import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/dbConfig";
import userRouter from "./routes/userRoutes";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });
