import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../features/generalSlice";
import { setFormModalShow } from "../../../features/modalSlice";
import hitApi from "../../../services/apiService";
import FormikControl from "../../formik/FormikControl";
const UpsertSubCategoryForm = () => {
  const dispatch = useDispatch();
  //States
  const { categories, subCategory } = useSelector(
    (state: any) => state.category
  );
  const [catList] = useState(function () {
    return categories.map((c) => {
      return { key: c.catName, value: c.id };
    });
  });

  //validation Schema
  const SubCategoryFormSchema = Yup.object({
    subCatName: Yup.string().required("Sub category name is required"),
    categoryId: Yup.string().required("Select Category"),
  });
  const handleSubmit = async (formData: any) => {
    dispatch(setLoading(true));
    if (subCategory.id) {
      formData.id = subCategory.id;
    }
    const data = await hitApi("PATCH", "/subCategory/upsertSubCat", formData);
    if (data.status === "success") {
      dispatch(setSuccess(data.message));
    } else {
      dispatch(setError(data.message));
    }
    dispatch(setFormModalShow(false));
  };
  return (
    <Formik
      initialValues={subCategory}
      validationSchema={SubCategoryFormSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="select"
            label="Select a Category"
            name="categoryId"
            options={catList}
          />
          <FormikControl
            control="input"
            type="text"
            label="Sub Category Name"
            name="subCatName"
          />
          <div className="border-top p-3 pb-0 custom-modal-footer">
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpsertSubCategoryForm;
