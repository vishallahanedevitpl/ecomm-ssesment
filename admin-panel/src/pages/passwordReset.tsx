import React from "react";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../features/generalSlice";
import hitApi from "../services/apiService";
const PasswordResetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const { isLoading } = useSelector((state: any) => state.general);

  //Form validation Schema
  const LoginFormSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
  });

  const sendPasswordUpdateRequest = async (formData: any) => {
    dispatch(setLoading(true));
    const { data } = await hitApi("POST", "/user/resetPassword", {
      password: formData.password,
      userId: queryParameters.get("id"),
      token: queryParameters.get("token"),
    });

    if (!data.status) {
      dispatch(setError(true));
      return;
    } else {
      dispatch(setLoading(false));
    }
    navigate("/login");
  };

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
                          Set your Password
                        </h5>
                        <p className="text-center small">
                          Enter your new password
                        </p>
                        {/* {isErrorMessage && (
                          <ErrorMessage message={errMessage} />
                        )} */}
                      </div>
                      <Formik
                        initialValues={{ password: "" }}
                        validationSchema={LoginFormSchema}
                        onSubmit={(values, { resetForm }) => {
                          sendPasswordUpdateRequest(values);
                          resetForm();
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="row g-3">
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
                                {isLoading ? "Loading…" : "Update"}
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

export default PasswordResetPage;
