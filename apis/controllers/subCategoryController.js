const expressAsyncHandler = require("express-async-handler");
const { handleMultipartData } = require("../config/subCategoryStorage");
const fs = require("fs");
const db = require("../models");
const { buildResponse } = require("../services/commonService");
const {
  upsertSubCategoryValidator,
} = require("../validations/categoryValidations");
const { FAILURE, SUCCESS } = require("../costants/responseStatus");
const Category = db.categories;
const SubCategory = db.subCategories;

//function for Update or Insert Category
const upsertSubCat = expressAsyncHandler(async (req, res) => {
  try {
    // validate incoming data
    await upsertSubCategoryValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });
    const { id, subCatName, categoryId } = req.body;
    const category = await SubCategory.upsert({ id, subCatName, categoryId });
    return buildResponse(
      res,
      SUCCESS,
      `Category ${category[1] ? "inserted" : "updated"} successfully`,
      category[0]
    );
  } catch (error) {
    return buildResponse(res, FAILURE, "Operation failed, please try again");
  }
});

//function for getting list of sub categories belongs to perticular category
const listSubCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.findByPk(req.params.catId, {
    include: {
      model: SubCategory,
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    },
  });
  return buildResponse(
    res,
    SUCCESS,
    "Categories fetched successfully",
    categories
  );
});

//function for getting sub categories details
const subCatDetails = expressAsyncHandler(async (req, res) => {
  const category = await SubCategory.findByPk(req.params.id);
  if (category) {
    return buildResponse(res, SUCCESS, "Category fetched", category);
  }
  return buildResponse(res, FAILURE, "Category not found");
});

//function for updating sub category's image
const updateImage = expressAsyncHandler(async (req, res) => {
  const category = await SubCategory.findByPk(req.params.id);
  if (!category) {
    return buildResponse(res, FAILURE, "Category not found");
  }
  //Putting category into request for reuse purpose
  req.category = category;

  //deleting existing image from folder
  if (category.subCatImage) {
    fs.unlinkSync(`.${category.subCatImage}`);
  }
  //validating and uploading image to server
  handleMultipartData(req, res, async (err) => {
    if (err) {
      return buildResponse(res, FAILURE, err.message);
    }
    //update uploaded image path to DB
    await category.update({
      subCatImage: `/${req.file.path.replace(/\\/g, "/")}`,
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
  upsertSubCat,
  listSubCategories,
  subCatDetails,
  updateImage,
};
