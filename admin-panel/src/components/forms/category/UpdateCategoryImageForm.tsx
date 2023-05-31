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

const UpdateCategoryImageForm = () => {
  const dispatch = useDispatch();
  //States
  const { category } = useSelector((state: any) => state.category);
  const [image, setImage] = useState(
    category.catImage
      ? `${process.env.REACT_APP_SERVER_URL + category.catImage}`
      : "/images/category.jpg"
  );
  const [catImageCon, setCatImageCon] = useState();

  const handleSubmit = async (params) => {
    dispatch(setLoading(true));
    const res = await hitApi(
      `PATCH`,
      `/category/updateImage/${category.id}`,
      { catImage: catImageCon },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
        initialValues={{}}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Update image for <b>{category.catName}</b>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Image Preview :
              </label>
              <br />
              <img
                src={image}
                style={{ width: "100px" }}
                alt={category.catName}
              />
            </div>
            <FormikControl
              control="input"
              type="file"
              label="Sub Category Image"
              name="subCatImage"
              onChange={(event) => {
                setCatImageCon(event.currentTarget.files[0]);
                const files = event.target.files;
                let myFiles: any = Array.from(files || []);
                setImage(URL.createObjectURL(myFiles[0]));
              }}
            />
            <div className="border-top p-3 pb-0 custom-modal-footer">
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

export default UpdateCategoryImageForm;
