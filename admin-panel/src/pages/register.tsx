import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorMessage from "../components/common/AlertMessage";
import { setError, setSuccess } from "../features/generalSlice";
import { registrationForm } from "../models/forms";
import hitApi from "../services/apiService";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, isError, isSuccess } = useSelector(
    (state: any) => state.general
  );
  const dispatch = useDispatch();

  //Form validation Schema
  const RegisterFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(30, "Name is too Long")
      .required("Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  //Registration API call
  const registerUser = async (formData: registrationForm) => {
    formData.roleId = 2;
    const data = await hitApi("POST", "/user/register", formData);
    if (data.status === 201) {
      dispatch(
        setSuccess(`${data.message}. Please check email for verification`)
      );
    }
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
                    <Link to={"/"}>
                      <span className="d-none d-lg-block">E-Comm</span>
                    </Link>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                        <p className="text-center small">
                          Enter your personal details to create account
                        </p>
                        {(isError || isSuccess) && <ErrorMessage />}
                      </div>
                      <Formik
                        initialValues={{ name: "", email: "", password: "" }}
                        validationSchema={RegisterFormSchema}
                        onSubmit={(values, { resetForm }) => {
                          registerUser(values);
                          resetForm();
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="row g-3">
                            <div className="col-12">
                              <label className="form-label">Name</label>
                              <Field name="name" className="form-control" />
                              {errors.name && touched.name ? (
                                <div className="invalid-feedback d-block">
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>
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
                              >
                                Create Account
                              </button>
                            </div>
                            <div className="col-12">
                              <p className="small mb-0">
                                Already have an account?
                                <Link to="/login" className="ms-2">
                                  Log in
                                </Link>
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

export default RegisterPage;
