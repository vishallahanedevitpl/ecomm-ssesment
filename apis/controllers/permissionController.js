const expressAsyncHandler = require("express-async-handler");
const validate = require("../validations");
const db = require("../models");
const { bulkPermissions } = require("../models");
const { buildResponse } = require("../services/commonService");
const { FAILURE, SUCCESS } = require("../costants/responseStatus");
const BulkPermission = db.bulkPermissions;
const addPermission = expressAsyncHandler(async (req, res) => {
  try {
    const rules = {
      permission: "required|string",
    };

    await validate(req.body, rules, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });

    const perm = await bulkPermissions.create({
      permission: req.body.permission,
    });

    return buildResponse(res, SUCCESS, "Permission added", perm);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

const deleteBulkPermission = expressAsyncHandler(async (req, res) => {
  try {
    const per = await BulkPermission.findByPk(req.params.id);
    if (!per) {
      return buildResponse(res, FAILURE, "Permission not found");
    }
    await per.destroy();
    return buildResponse(res, SUCCESS, "Permission deleted");
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

const listPermissions = expressAsyncHandler(async (req, res) => {
  try {
    const bulkPers = await BulkPermission.findAll();
    return buildResponse(res, SUCCESS, "Bulk permissions fetched", bulkPers);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
module.exports = { addPermission, deleteBulkPermission, listPermissions };
