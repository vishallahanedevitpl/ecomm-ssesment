const { Router } = require("express");
const {
  addNewProduct,
  addProductDetails,
  addProductImage,
  deleteProductImage,
  productImageList,
  productList,
  singleProduct,
  updateProduct,
  updateProductDetails,
  productVariantDetails,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

const productRouter = Router();

productRouter.post("/add", protect, addNewProduct);
productRouter.patch("/update/:id", protect, updateProduct);
productRouter.get("/getSingle/:id", singleProduct);
productRouter.get("/getList", productList);
productRouter.post("/addProductDetails/:id", protect, addProductDetails);
productRouter.patch(
  "/updateProductDetails/:varId",
  protect,
  updateProductDetails
);
productRouter.post("/addProductImage/:varId", protect, addProductImage);
productRouter.delete(
  "/deleteProductImage/:imageId",
  protect,
  deleteProductImage
);
productRouter.get("/productImageList/:varId", productImageList);
productRouter.get("/variant/:varId", productVariantDetails);

module.exports = productRouter;
