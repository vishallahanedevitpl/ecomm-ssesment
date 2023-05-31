import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setLoggedInUser,
} from "../../../features/generalSlice";
import { axiosInstance } from "../../../config/axiosConfig";
import hitApi from "../../../services/apiService";

const ProfilePicForm = () => {
  const dispatch = useDispatch();
  //States
  const { user } = useSelector((state: any) => state.general);

  const [image, setImage] = useState<string>(
    user.profilePic
      ? `${process.env.REACT_APP_SERVER_URL}${user.profilePic}`
      : `/images/avatar.png`
  );

  //Form Validations

  const profilePicSchema = Yup.object({
    profilePic: Yup.mixed()
      .test("fileSize", "File size is too large", (val: any) => {
        return val && val.size <= 500000;
      })
      .test(
        "fileType",
        "Only .jpg, .jpeg, .png and .webp types allowed",
        (value: any) => {
          if (value) {
            return (
              value.type === "image/jpeg" ||
              value.type === "image/jpg" ||
              value.type === "image/png" ||
              value.type === "image/webp"
            );
          } else {
            return true;
          }
        }
      ),
  });

  //API Calls

  //Update Profile Picture
  const uploadProfilePic = async (formData: any) => {
    if (!formData.profilePic) {
      return;
    }

    dispatch(setLoading(true));
    const payload = new FormData();
    payload.append("profilePic", formData.profilePic);
    const res = await hitApi("PATCH", "/user/updateProfilePic", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === "success") {
      delete res.result.updatedAt;
      dispatch(setLoggedInUser({ ...user, ...res.result }));
    } else {
      dispatch(setError(res.message));
    }
  };
  return (
    <Formik
      initialValues={{ profilePic: {} }}
      validationSchema={profilePicSchema}
      onSubmit={(values, { resetForm }) => {
        uploadProfilePic(values);
      }}
    >
      {(formik) => (
        <Form>
          <div className="row">
            <label
              htmlFor="profileImage"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Profile Image
            </label>
            <div className="col-md-8 col-lg-9 mb-3">
              <div className="mb-3">
                <img src={image} alt="" style={{ width: "100px" }} />
              </div>
              {formik.errors.profilePic && formik.touched.profilePic ? (
                <div className="invalid-feedback d-block">
                  {String(formik.errors.profilePic)}
                </div>
              ) : null}
              <div>
                <label
                  htmlFor="profileImageInput"
                  className="btn btn-secondary btn-sm me-2"
                >
                  <i className="bi bi-pencil" />
                </label>
                <input
                  className="d-none"
                  id="profileImageInput"
                  name="profilePic"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "profilePic",
                      event.currentTarget.files[0]
                    );
                    const files = event.target.files;
                    let myFiles = Array.from(files || []);
                    setImage(URL.createObjectURL(myFiles[0]));
                  }}
                />

                <button className="btn btn-primary btn-sm me-2" type="submit">
                  <i className="bi bi-upload" />
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilePicForm;
