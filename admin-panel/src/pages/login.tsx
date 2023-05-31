import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { registrationForm } from "../models/forms";
import { useSelector } from "react-redux";
import AlertMessage from "../components/common/AlertMessage";
import { useDispatch } from "react-redux/es/exports";
import {
  setError,
  setLoading,
  setLoggedInUser,
} from "../features/generalSlice";
import hitApi from "../services/apiService";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, isError, user } = useSelector(
    (state: any) => state.general
  );
  //Form validation Schema
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginUser = async (formData: registrationForm) => {
    dispatch(setLoading(true));
    const data = await hitApi("POST", "/user/login", formData);

    if (data.status !== 200) {
      dispatch(setError(data.message));
      return;
    }
    if (!data.result.role.permissions.includes("ADMIN_PANEL_ACCESS")) {
      dispatch(setError("You are not allowed to login here"));
      return;
    }
    localStorage.setItem("user", JSON.stringify(data.result));
    dispatch(setLoggedInUser(data.result));
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <span className="d-none d-lg-block">E-Comm</span>
                    </a>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username & password to login
                        </p>
                        {isError && <AlertMessage />}
                      </div>
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginFormSchema}
                        onSubmit={(values, { resetForm }) => {
                          loginUser(values);
                          resetForm();
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="row g-3">
                            <div className="col-12">
                              <label className="form-label">Email</label>
                              <Field name="email" className="form-control" />
                              {errors.email && touched.email ? (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="col-12">
                              <label className="form-label">Password</label>
                              <Field
                                type="password"
                                name="password"
                                className="form-control"
                              />
                              {errors.password && touched.password ? (
                                <div className="invalid-feedback d-block">
                                  {errors.password}
                                </div>
                              ) : null}
                            </div>
                            <div className="col-12">
                              <button
                                className="btn btn-primary w-100"
                                type="submit"
                                disabled={isLoading}
                              >
                                {isLoading ? "Loading…" : "Login"}
                              </button>
                            </div>
                            <div className="col-12">
                              <p className="small mb-0">
                                Don't have account?
                                <Link to="/register">Create an account</Link>
                              </p>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
