import { Form, Formik } from "formik";
import FormikControl from "../../formik/FormikControl";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import hitApi from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  setBulkPermissionList,
  setPermissions,
} from "../../../features/dynamicDataSlice";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../features/generalSlice";
import { setFormModalShow } from "../../../features/modalSlice";
import ModulePermissionCard from "../../rolesAndPermissions/ModulePermissionCard";
const AddRoleForm = () => {
  const dispatch = useDispatch();
  //State variable
  const { rolePermissions, singleRole, selectedRoleId, bulkPermissionList } =
    useSelector((state: any) => state.dynamicData);

  const [assignedPermissions, setAssignedPermissions] = useState(
    singleRole.permissions !== undefined
      ? JSON.parse(singleRole.permissions)
      : {
          user: ["add", "update", "list"],
          category: ["add", "update", "list"],
          product: ["add", "update", "list"],
        }
  );

  const [modules, setModules] = useState(Object.keys(assignedPermissions));
  const [roleName, setRoleName] = useState(singleRole.roleName || "");

  //Add single permission
  const addSinglePermission = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    //Check for enter key
    if (code !== 13) return;
    //check for empty value
    let val = e.target.value;
    if (val === "") return;
    val = val.toLowerCase();

    val = val.split(".");
    //check for permission value
    if (val.length < 2 || val[1] === "") return;

    const md = val[0];

    if (assignedPermissions[md] !== undefined) {
      assignedPermissions[md].push(val[1]);
      setAssignedPermissions({ ...assignedPermissions });
    } else {
      assignedPermissions[md] = [val[1]];
      setAssignedPermissions({ ...assignedPermissions });
      setModules(Object.keys(assignedPermissions));
    }
    //make empty value
    e.target.value = "";
  };

  //add bulk permissions
  const addBulkPermissions = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    //Check for enter key
    if (code !== 13) return;
    //check for empty value
    let val = e.target.value;
    if (val === "") return;
    val = val.toLowerCase();
    val = val.replace(/[^a-z ]/g, "");
    const bps = bulkPermissionList.map((p) => p.permission);
    assignedPermissions[val] = bps;
    setAssignedPermissions({ ...assignedPermissions });
    setModules(Object.keys(assignedPermissions));
    //make empty value
    e.target.value = "";
  };
  //remove permission
  const removePermission = (key, value) => {
    assignedPermissions[key] = assignedPermissions[key].filter(
      (ele) => ele !== value
    );

    if (!assignedPermissions[key].length) {
      delete assignedPermissions[key];
      setModules(Object.keys(assignedPermissions));
    }
    setAssignedPermissions({ ...assignedPermissions });
  };
  //API Calls
  //Add new role
  const submitForm = async (formData: any) => {
    dispatch(setLoading(true));
    if (selectedRoleId) {
      //Update role
      const res = await hitApi(
        `PATCH`,
        `/role/update/${selectedRoleId}`,
        formData
      );
      if (res.status === 200) {
        dispatch(setSuccess(res.message));
      } else {
        dispatch(setError(res.message));
      }
    } else {
      //Insert Role
      const res = await hitApi(`POST`, `/role/add`, formData);
      if (res.status === 201) {
        dispatch(setSuccess(res.message));
      } else {
        dispatch(setError(res.message));
      }
    }
    dispatch(setFormModalShow(false));
  };

  const handleSubmit = async () => {
    if (roleName === "") return;
    dispatch(setLoading(true));
    if (singleRole.id !== undefined) {
      //Update Role
      const res = await hitApi(`PATCH`, `/role/update/${singleRole.id}`, {
        roleName,
        permissions: assignedPermissions,
      });
      if (res.status === "success") {
        dispatch(setSuccess(res.message));
      } else {
        dispatch(setError(res.message));
      }
    } else {
      //Insert Role
      const res = await hitApi(`POST`, `/role/add`, {
        roleName,
        permissions: assignedPermissions,
      });
      if (res.status === "success") {
        dispatch(setSuccess(res.message));
      } else {
        dispatch(setError(res.message));
      }
    }
    dispatch(setFormModalShow(false));
  };

  //Fetch Bulk Permissions
  const fetchBulkPermissions = async () => {
    const res = await hitApi("GET", "/role/listBulkPermissions");
    if (res.status === "success") {
      dispatch(setBulkPermissionList(res.result));
    } else {
      dispatch(setError(res.message));
    }
  };

  useEffect(() => {
    fetchBulkPermissions();
  }, []);
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Role Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Role Name"
              value={roleName}
              onChange={(e: any) => {
                setRoleName(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Single Permission</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Single Permission"
              onKeyDown={(e) => {
                addSinglePermission(e);
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Bulk Permissions</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Bulk Permissions"
              onKeyDown={(e) => {
                addBulkPermissions(e);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <h5 className="mb-3">Assigned Permissions</h5>
        {modules.map((md, i) => (
          <div className="col-md-4" key={i}>
            <ModulePermissionCard
              removePermission={removePermission}
              moduleName={md}
              perms={assignedPermissions[md]}
            />
          </div>
        ))}
      </div>
      <div className="border-top p-3 custom-modal-footer">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddRoleForm;
