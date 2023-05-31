const { Router } = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  listCategories,
  singleCategory,
  upsertCategory,
  updateImage,
} = require("../controllers/categoryController");
const { checkRole } = require("../middlewares/roleMiddleware");

const categoryRouter = Router();
//prefix => /category
categoryRouter.get("/list", listCategories);
categoryRouter.patch("/upsert", protect, upsertCategory);
categoryRouter.get("/details/:id", singleCategory);
categoryRouter.patch("/updateImage/:id", protect, updateImage);

module.exports = categoryRouter;
