const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const { buildResponse } = require("../services/commonService");
const {
  addRoleValidator,
  updateRoleValidator,
} = require("../validations/roleValidation");
const permission = require("../costants/permissions");
const { FAILURE, SUCCESS } = require("../costants/responseStatus");

const Role = db.roles;
//function to add new role
const addRole = expressAsyncHandler(async (req, res) => {
  try {
    //validate incoming data
    await addRoleValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });

    const { roleName, permissions } = req.body;
    //Insert data
    const role = await Role.create({ roleName, permissions });

    return buildResponse(res, SUCCESS, "New role created", role);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

//function to update role
const updateRole = expressAsyncHandler(async (req, res) => {
  try {
    //validate incoming data
    await updateRoleValidator(req.body, (err, status) => {
      if (!status) {
        return buildResponse(res, FAILURE, "Validation failed", err.errors);
      }
    });
    //Fetch role
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return buildResponse(res, SUCCESS, "Role not found");
    }
    const { roleName, permissions } = req.body;
    await role.update({ roleName, permissions });
    return buildResponse(res, FAILURE, "Role updated successfully", role);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});

//function to fetch list
const list = expressAsyncHandler(async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    return buildResponse(res, SUCCESS, "Roles fetched", roles);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
//function to fetch single
const single = expressAsyncHandler(async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return buildResponse(res, FAILURE, "Role not found");
    }
    return buildResponse(res, SUCCESS, "Role fetched", role);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
//function  get all permission
const permissionList = expressAsyncHandler(async (req, res) => {
  try {
    return buildResponse(res, SUCCESS, "Permissions Fetched", permission);
  } catch (error) {
    return buildResponse(res, FAILURE, error.message);
  }
});
module.exports = { addRole, updateRole, list, single, permissionList };
