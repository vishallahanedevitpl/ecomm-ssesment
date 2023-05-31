const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const { handleMultipartData } = require("../config/productStorage");
const { getFullProductByPVID } = require("../services/productService");
const { buildResponse } = require("../services/commonService");
const db = require("../models");
const {
  addProductValidator,
  updateProductValidator,
  addProductDetailsValidator,
  updateProductDetailsValidator,
} = require("../validations/productValidations");
const { FAILURE, SUCCESS } = require("../costants/responseStatus");
const Product = db.products;
const ProductColor = db.productColors;
const ProductSize = db.productSizes;
const ProductVariant = db.productVariants;
const ProductImage = db.productImages;
//Function to add new produc
const addNewProduct = expressAsyncHandler(async (req, res) => {
  try {
    //Validate incoming data
    await addProductValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });
    //de-structure required data
    const { productName, subCategoryId, categoryId, productFor, userId } =
      req.body;
    //Make db entry
    const product = await Product.create({
      productName,
      categoryId,
      subCategoryId,
      productFor,
      userId,
    });
    if (product) {
      return buildResponse(res, SUCCESS, "Product added successfully", product);
    } else {
      return buildResponse(FAILURE, "Product not added");
    }
  } catch (error) {
    return buildResponse(FAILURE, error.message);
  }
});

//Function to update product
const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    // Validate incoming data
    await updateProductValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) {
      return buildResponse(res, FAILURE, "Product not found");
    }

    const { productName, subCategoryId, categoryId, productFor, userId } =
      req.body;

    const up = await product.update({
      productName,
      categoryId,
      subCategoryId,
      productFor,
      userId,
    });
    if (up)
      return buildResponse(res, SUCCESS, "Product Updated Successfully", up);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
//Single Product details with all variants
const singleProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: ProductColor,
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          model: ProductSize,
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          model: ProductVariant,
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          include: {
            model: ProductImage,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        },
      ],
    });
    if (product) return buildResponse(res, SUCCESS, "Product fetched", product);
    else return buildResponse(res, FAILURE, "Product not found");
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
//function to get list of products
const productList = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: {
        model: ProductVariant,
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        include: [
          {
            model: ProductColor,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
          {
            model: ProductSize,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
          {
            model: ProductImage,
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        ],
      },
    });
    return buildResponse(res, SUCCESS, "Products fetched", products);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

//Function to add product's details
const addProductDetails = expressAsyncHandler(async (req, res) => {
  const trstn = await db.sequelize.transaction();
  try {
    //validate incoming data
    await addProductDetailsValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(FAILURE, "Validation failed", err.errors);
      }
    });

    //Check for product existance
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return buildResponse(FAILURE, "Product not found");
    }

    //Destructuring required data
    const {
      color,
      size,
      price,
      isOnSale,
      discount,
      availableStock,
      productDescription,
    } = req.body;

    //Make product color entry
    const pColor = await ProductColor.create(
      {
        productId: product.id,
        color,
      },
      { transaction: trstn }
    );
    //Product Size entry
    const pSize = await ProductSize.create(
      {
        productId: product.id,
        size,
      },
      { transaction: trstn }
    );
    //Product variant entry
    const variant = await ProductVariant.create(
      {
        productId: product.id,
        productSizeId: pSize.id,
        productColorId: pColor.id,
        price,
        isOnSale,
        discount,
        availableStock,
        productDescription,
      },
      { transaction: trstn }
    );
    //commit transation
    await trstn.commit();
    const productDetails = await getFullProductByPVID(variant.id);
    return buildResponse(res, SUCCESS, "Product added", productDetails);
  } catch (error) {
    //rollback transation
    await trstn.rollback();
    return buildResponse(res, FAILURE, error.message);
  }
});
//Function to update product details
const updateProductDetails = expressAsyncHandler(async (req, res) => {
  const trstn = await db.sequelize.transaction();
  try {
    //validate incoming data
    await updateProductDetailsValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });

    //Check for product variant's existance
    const productVariant = await ProductVariant.findByPk(req.params.varId);
    if (!productVariant) {
      return buildResponse(res, FAILURE, "Product not found");
    }
    //Destructuring required data
    const {
      color,
      size,
      price,
      isOnSale,
      discount,
      availableStock,
      productDescription,
    } = req.body;

    //update product variant's color only if it exist in request data
    if (color !== undefined) {
      const upColor = await ProductColor.update(
        { color },
        { where: { id: productVariant.productColorId }, transaction: trstn }
      );
    }
    //update product variant's size only if it exist in request data
    if (size !== undefined) {
      const upSize = await ProductSize.update(
        { size },
        { where: { id: productVariant.productSizeId }, transaction: trstn }
      );
    }
    //Update product variants data
    await productVariant.update(
      {
        price,
        isOnSale,
        discount,
        availableStock,
        productDescription,
      },
      { transaction: trstn }
    );
    //commit transation
    await trstn.commit();
    const product = await getFullProductByPVID(req.params.varId);
    return buildResponse(res, SUCCESS, "Product details updated", product);
  } catch (error) {
    //rollback transaction if error occured
    await trstn.rollback();
    return buildResponse(res, FAILURE, error.message);
  }
});

const addProductImage = expressAsyncHandler(async (req, res) => {
  try {
    //check wherether product exist or not
    const product = await getFullProductByPVID(req.params.varId);
    if (!product) {
      return buildResponse(res, FAILURE, "Product not found");
    }
    //merge data into request
    req.product = product;
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return buildResponse(res, FAILURE, err.message);
      }
      //make image entry
      const image = await ProductImage.create({
        productVariantId: product.id,
        url: `/${req.file.path.replace(/\\/g, "/")}`,
      });
      return buildResponse(res, FAILURE, "Product image uploaded", image);
    });
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

const deleteProductImage = expressAsyncHandler(async (req, res) => {
  try {
    //check for product existance
    const image = await ProductImage.findByPk(req.params.imageId);
    if (!image) {
      return buildResponse(res, FAILURE, "Product image not found");
    }

    fs.unlinkSync(`.${image.url}`);
    await image.destroy();
    return buildResponse(res, SUCCESS, "Image deleted");
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

const productImageList = expressAsyncHandler(async (req, res) => {
  try {
    const images = await ProductImage.findAll({
      where: { productVariantId: req.params.varId },
    });
    return buildResponse(res, SUCCESS, "Images fetched", images);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

const productVariantDetails = expressAsyncHandler(async (req, res) => {
  const product = await getFullProductByPVID(req.params.varId);
  return buildResponse(res, SUCCESS, "Product fetched", product);
});
module.exports = {
  addNewProduct,
  addProductDetails,
  addProductImage,
  deleteProductImage,
  productImageList,
  productList,
  productVariantDetails,
  singleProduct,
  updateProduct,
  updateProductDetails,
};
