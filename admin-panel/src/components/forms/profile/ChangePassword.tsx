import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../../config/axiosConfig";
import { useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../features/generalSlice";
const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  //Validation schema
  const ChangePasswordSchema = Yup.object({
    current: Yup.string().required("Current password is required"),
    password: Yup.string().required("New password is required"),
    password_confirmation: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const changePassword = async (formData: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axiosInstance.patch(
        "/user/changePassword",
        formData
      );
      if (data.status === "success") {
        dispatch(setSuccess(data.message));
      } else {
        dispatch(setError(data.message));
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return (
    <Formik
      initialValues={{
        current: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values, { resetForm }) => {
        changePassword(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">Current Password</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field
                type="password"
                name="current"
                placeholder="Current Password"
                className="form-control w-75"
              />
              {formik.errors.current && formik.touched.current ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.current)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">New Password</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field
                type="password"
                name="password"
                placeholder="New Password"
                className="form-control w-75"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.password)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">Confirm Password</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                className="form-control w-75"
              />
              {formik.errors.password_confirmation &&
              formik.touched.password_confirmation ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.password_confirmation)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 pt-3">
              <button type="submit" className="btn btn-primary">
                Change
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
