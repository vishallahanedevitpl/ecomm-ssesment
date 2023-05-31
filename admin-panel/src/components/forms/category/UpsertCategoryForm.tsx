import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setCategory } from "../../../features/categorySlice";
import {
  setError,
  setLoading,
  setSuccess,
} from "../../../features/generalSlice";
import { setFormModalShow } from "../../../features/modalSlice";
import { CategoryAddFormType } from "../../../models/forms";
import hitApi from "../../../services/apiService";
import FormikControl from "../../formik/FormikControl";
const UpsertCategoryForm = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state: any) => state.category);
  //Form validation Schema
  const CategoryFormSchema = Yup.object().shape({
    catName: Yup.string().required("Category name is required"),
  });

  //upsert new category
  const handleSubmit = async (formData: CategoryAddFormType) => {
    dispatch(setLoading(true));
    if (category.id) {
      formData.id = category.id;
    }
    const data = await hitApi("PATCH", "/category/upsert", formData);
    if (data.status === "success") {
      dispatch(setSuccess(data.message));
    } else {
      dispatch(setError(data.message));
    }
    dispatch(setFormModalShow(false));
  };
  return (
    <Formik
      initialValues={{ catName: category.catName }}
      validationSchema={CategoryFormSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="text"
            label="Category Name"
            name="catName"
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

export default UpsertCategoryForm;
