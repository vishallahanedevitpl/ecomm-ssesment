import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../features/generalSlice";
import { setFormModalShow } from "../../../features/modalSlice";
import hitApi from "../../../services/apiService";
import FormikControl from "../../formik/FormikControl";

const UpdateUserRoleForm = () => {
  const dispatch = useDispatch();
  //States
  const { roleList } = useSelector((state: any) => state.dynamicData);
  const { singleUser } = useSelector((state: any) => state.user);
  const [roles] = useState(() => {
    return roleList.map((c) => {
      return { key: c.roleName, value: c.id };
    });
  });

  //API calls
  const handleSubmit = async (formData: any) => {
    dispatch(setLoading(true));
    const update = await hitApi(
      `PATCH`,
      `/user/updateProfileDetailsByAdmin/${singleUser.id}`,
      { roleId: formData.roleId }
    );

    if (update.status === "success") {
      dispatch(setSuccess(update.message));
    } else {
      dispatch(setError(update.message));
    }
    dispatch(setFormModalShow(false));
  };
  return (
    <>
      <Formik
        initialValues={singleUser}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label="User Name"
              name="name"
              readOnly={true}
            />
            <FormikControl
              control="select"
              label="Select a Category"
              name="roleId"
              options={roles}
            />
            <div className="border-top p-3 custom-modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateUserRoleForm;
