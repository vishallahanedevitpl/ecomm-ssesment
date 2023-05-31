const { Router } = require("express");
const {
  upsertSubCat,
  listSubCategories,
  subCatDetails,
  updateImage,
} = require("../controllers/subCategoryController");
const protect = require("../middlewares/authMiddleware");
const subCategoryRouter = Router();
//prefix => /subCategory
subCategoryRouter.patch("/upsertSubCat", protect, upsertSubCat);
subCategoryRouter.get("/list/:catId", listSubCategories);
subCategoryRouter.get("/details/:id", subCatDetails);
subCategoryRouter.patch("/updateImage/:id", updateImage);

module.exports = subCategoryRouter;
