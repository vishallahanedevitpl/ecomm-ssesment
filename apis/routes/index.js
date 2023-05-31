const { Router } = require("express");
const categoryRouter = require("./categoryRoutes");
const productRouter = require("./productRoutes");
const roleRouter = require("./roleRoutes");
const subCategoryRouter = require("./subCategoryRoutes");
const userRouter = require("./userRoutes");

const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);
router.use("/product", productRouter);
router.use("/role", roleRouter);

module.exports = router;
