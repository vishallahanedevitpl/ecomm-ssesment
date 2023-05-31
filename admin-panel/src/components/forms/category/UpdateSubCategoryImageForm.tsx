import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../features/generalSlice";
import { setFormModalShow } from "../../../features/modalSlice";
import hitApi from "../../../services/apiService";
import FormikControl from "../../formik/FormikControl";

const UpdateSubCategoryImageForm = () => {
  const dispatch = useDispatch();
  //States
  const { subCategory } = useSelector((state: any) => state.category);
  const [image, setImage] = useState(
    subCategory.subCatImage
      ? `${process.env.REACT_APP_SERVER_URL + subCategory.subCatImage}`
      : "/images/category.jpg"
  );
  const [subCatImageCon, setSubCatImageCon] = useState();

  //handle submit
  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const res = await hitApi(
      `PATCH`,
      `/subCategory/updateImage/${subCategory.id}`,
      { subCatImage: subCatImageCon },
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
        initialValues={{ subCatImage: null }}
        onSubmit={(values) => {
          handleSubmit();
        }}
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Update image for <b>{subCategory.subCatName}</b>
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
                alt={subCategory.subCatName}
              />
            </div>
            <FormikControl
              control="input"
              type="file"
              label="Sub Category Image"
              name="subCatImage"
              onChange={(event) => {
                setSubCatImageCon(event.currentTarget.files[0]);
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

export default UpdateSubCategoryImageForm;
