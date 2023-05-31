const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const _ = require("underscore");
const router = require("./routes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./models");

//Making directory publicly access for images
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

//Trim white spaces from req
const trimmer = function (req, res, next) {
  req.body = _.object(
    _.map(req.body, function (value, key) {
      if (typeof value === "string") return [key, value.trim()];
      else return [key, value];
    })
  );
  next();
};

app.use(trimmer);
//Including routes
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
