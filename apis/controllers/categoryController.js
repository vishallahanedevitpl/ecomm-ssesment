const expressAsyncHandler = require("express-async-handler");
const { handleMultipartData } = require("../config/catStorage");
const db = require("../models");
const { buildResponse } = require("../services/commonService");
const fs = require("fs");
const {
  upsertCategoryValidator,
} = require("../validations/categoryValidations");
const { FAILURE, SUCCESS } = require("../costants/responseStatus");
const Category = db.categories;

//function for getting list of all categories
const listCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  return buildResponse(
    res,
    SUCCESS,
    "Categories fetched successfully",
    categories
  );
});

//function for upsert catergory
const upsertCategory = expressAsyncHandler(async (req, res) => {
  try {
    // validate incoming data
    await upsertCategoryValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });
    const { id, catName } = req.body;
    const category = await Category.upsert({ id, catName });
    return buildResponse(
      res,
      SUCCESS,
      `Category ${category[1] ? "inserted" : "updated"} successfully`,
      category[0]
    );
  } catch (error) {
    return buildResponse(res, FAILURE, "operation failed, please try again");
  }
});

//function for getting single category
const singleCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    return buildResponse(res, SUCCESS, "Category fetched", category);
  }
  return buildResponse(res, FAILURE, "Category not found");
});

//function for update category image
const updateImage = expressAsyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return buildResponse(res, FAILURE, "Category not found");
  }
  //Putting category into request for reuse purpose
  req.category = category;

  //deleting existing image from folder
  if (category.catImage) {
    fs.unlinkSync(`.${category.catImage}`);
  }

  //validating and uploading image to server
  handleMultipartData(req, res, async (err) => {
    if (err) {
      return buildResponse(res, FAILURE, err.message);
    }
    //update uploaded image path to DB
    await category.update({
      catImage: `/${req.file.path.replace(/\\/g, "/")}`,
    });

    return buildResponse(
      res,
      SUCCESS,
      "Category image updated successfully",
      category
    );
  });
});

module.exports = {
  listCategories,
  upsertCategory,
  singleCategory,
  updateImage,
};
