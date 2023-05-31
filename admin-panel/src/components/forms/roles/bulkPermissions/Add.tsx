import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../../features/generalSlice";
import { setFormModalShow } from "../../../../features/modalSlice";
import hitApi from "../../../../services/apiService";
import FormikControl from "../../../formik/FormikControl";

const AddBulkPermissionForm = () => {
  const dispatch = useDispatch();
  //api calls
  const handleSubmit = async (formData) => {
    dispatch(setLoading(true));
    const res = await hitApi(`POST`, `/role/addBulkPermission`, formData);
    if (res.status === "success") {
      dispatch(setSuccess(res.message));
    } else {
      dispatch(setError(res.message));
    }
    dispatch(setFormModalShow(false));
  };
  return (
    <>
      <Formik
        initialValues={{ permission: "" }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label="Permission"
              name="permission"
            />
            <div className="border-top p-3 custom-modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddBulkPermissionForm;
