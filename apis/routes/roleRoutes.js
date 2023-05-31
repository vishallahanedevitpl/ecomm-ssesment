const { Router } = require("express");
const {
  addPermission,
  deleteBulkPermission,
  listPermissions,
} = require("../controllers/permissionController");
const {
  addRole,
  updateRole,
  list,
  single,
  permissionList,
} = require("../controllers/roleController");
const protect = require("../middlewares/authMiddleware");

const roleRouter = Router();

//prefix => /role
roleRouter.post("/add", protect, addRole);
roleRouter.patch("/update/:id", protect, updateRole);
roleRouter.get("/list", protect, list);
roleRouter.get("/details/:id", protect, single);
roleRouter.get("/permissionList", protect, permissionList);
roleRouter.post("/addBulkPermission", protect, addPermission);
roleRouter.delete("/deleteBulkPermission/:id", protect, deleteBulkPermission);
roleRouter.get("/listBulkPermissions", protect, listPermissions);

module.exports = roleRouter;
