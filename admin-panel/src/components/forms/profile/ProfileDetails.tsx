import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { UserModel } from "../../../models/data";
import {
  setError,
  setLoading,
  setLoggedInUser,
} from "../../../features/generalSlice";
import { axiosInstance } from "../../../config/axiosConfig";
const ProfileDetailsForm = () => {
  const dispatch = useDispatch();
  //States
  const { user, isError, errorMessage } = useSelector(
    (state: any) => state.general
  );

  //Form Validations
  const phoneRegExp = /^\d{10}$/;
  const userDetailsFormSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    dob: Yup.date()
      .max(new Date(), "Date of birth shouldn't be less than today's date")
      .nullable(),
    mobileNo: Yup.string()
      .matches(phoneRegExp, "Mobile number should contain 10 digits")
      .nullable(),
    hobbies: Yup.string().nullable(),
  });

  //API Calls
  //Update Profile details
  const updateProfileDetails = async (formData: UserModel) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axiosInstance.patch(
        `/user/updateProfileDetails`,
        formData
      );
      if (data.status === "success") {
        dispatch(setLoggedInUser({ ...user, ...data.result }));
      } else {
        dispatch(setError(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
  return (
    <Formik
      initialValues={{
        name: user.name,
        dob: user.dob && new Date(user.dob).toISOString().split("T")[0],
        gender: user.gender,
        mobileNo: user.mobileNo,
        hobbies: user.hobbies,
      }}
      validationSchema={userDetailsFormSchema}
      onSubmit={(values, { resetForm }) => {
        updateProfileDetails(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form className="border-top py-3">
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">Name</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="form-control w-75"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.name)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">Gender</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <label className="me-3">
                <Field
                  type="radio"
                  name="gender"
                  value="male"
                  className="me-2"
                />
                Male
              </label>
              <label>
                <Field
                  type="radio"
                  name="gender"
                  value="female"
                  className="me-2"
                />
                Female
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">DOB</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field type="date" name="dob" className="form-control w-75" />
              {formik.errors.dob && formik.touched.dob ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.dob)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">Mobile No</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field
                type="text"
                name="mobileNo"
                placeholder="Mobile No"
                className="form-control w-75"
              />
              {formik.errors.mobileNo && formik.touched.mobileNo ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.mobileNo)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="col-form-label">Hobbies</label>
            </div>
            <div className="col-md-8 col-lg-9 mb-3">
              <Field
                type="text"
                name="hobbies"
                placeholder="Hobbies"
                className="form-control w-75"
              />
              {formik.errors.hobbies && formik.touched.hobbies ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.hobbies)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 pt-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDetailsForm;
