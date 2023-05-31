import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setError, setLoading } from "../../features/generalSlice";
import AdminLayout from "../../layout/admin";
import { CategoryModel } from "../../models/data";
import DataTable from "react-data-table-component";
import hitApi from "../../services/apiService";
import FormContainerModal from "../../components/modals/FormContainerModal";
import UpsertCategoryForm from "../../components/forms/category/UpsertCategoryForm";
import { setFormModalShow } from "../../features/modalSlice";
import { setCategory } from "../../features/categorySlice";
import AlertMessage from "../../components/common/AlertMessage";
import UpdateCategoryImageForm from "../../components/forms/category/UpdateCategoryImageForm";

const CategoryListPage = () => {
  //State Variables
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [formInModal, setFormInModal] = useState<string>("CAT");

  const { isError, isSuccess, user } = useSelector(
    (state: any) => state.general
  );
  const { category } = useSelector((state: any) => state.category);
  //API calls
  //Fetch available categories
  const fetchList = async () => {
    dispatch(setLoading(true));
    const data = await hitApi("GET", "/category/list");
    if (data.status === "success") {
      setCategories(data.result);
    }
    dispatch(setLoading(false));
  };
  //Fetch single category and add into state
  const getCategoryToEdit = async (id: number, formName: string) => {
    dispatch(setLoading(true));
    const data = await hitApi(`GET`, `/category/details/${id}`);
    if (data.status === "success") {
      dispatch(
        setCategory({
          id: data.result.id,
          catName: data.result.catName,
          catImage: data.result.catImage,
        })
      );
      dispatch(setFormModalShow(true));
      dispatch(setLoading(false));
    } else {
      dispatch(setError(data.message));
    }
    setFormInModal(formName);
  };

  useEffect(() => {
    fetchList();
  }, []);

  //Data table columns
  const columns = [
    {
      name: "Category",
      selector: (row: any) => row.catName,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row: any) => (
        <>
          <img
            style={{ width: "100px" }}
            src={
              row.catImage
                ? `${process.env.REACT_APP_SERVER_URL + row.catImage}`
                : "/images/category.jpg"
            }
            alt={row.catName}
          />
        </>
      ),
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          <Link
            to={`/category/sub-categories/${row.id}`}
            className="btn btn-secondary btn-sm me-2"
            title="View Sub Category List"
          >
            <i className="bi bi-list-nested" />
          </Link>
          {/* Access control check */}
          {user.role.permissions.includes("CATEGORY_UPSERT") && (
            <>
              <button
                onClick={() => {
                  getCategoryToEdit(row.id, "CAT");
                }}
                className="btn btn-primary btn-sm me-2"
                title="Edit Category"
              >
                <i className="bi bi-pencil" />
              </button>
              <button
                onClick={() => {
                  getCategoryToEdit(row.id, "CAT_IMAGE");
                }}
                className="btn btn-info btn-sm me-2"
                title="Update Category Image"
              >
                <i className="bi bi-image" />
              </button>

              <button className="btn btn-danger btn-sm" title="Delete Category">
                <i className="bi bi-trash" />
              </button>
            </>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <AdminLayout
        pageTitle="Categories"
        breadcrumbs={[{ title: "Categories", isActive: true }]}
      >
        <section className="section profile">
          <div className="card">
            <div className="card-body pt-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <form
                  className="search-form d-flex align-items-center"
                  method="POST"
                  action="#"
                >
                  <InputGroup>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                    <InputGroup.Text className="bg-transparent">
                      <button className="border-0 bg-transparent">
                        <i className="bi bi-search"></i>
                      </button>
                    </InputGroup.Text>
                  </InputGroup>
                </form>
                <div>
                  {/* Access control check */}
                  {user.role.permissions.includes("CATEGORY_UPSERT") && (
                    <button
                      className="btn btn-primary btn-sm"
                      title="Add new category"
                      onClick={() => {
                        dispatch(setFormModalShow(true));
                      }}
                    >
                      <i className="bi bi-plus-lg" />
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
                {(isError || isSuccess) && <AlertMessage />}
                <DataTable columns={columns} data={categories} />
              </div>
            </div>
          </div>
        </section>
        <FormContainerModal
          modalTitle={category.id ? "Update category" : "Add new category"}
          formKey="CATEGORY_FORM"
        >
          {formInModal === "CAT" ? (
            <UpsertCategoryForm />
          ) : (
            <UpdateCategoryImageForm />
          )}
        </FormContainerModal>
      </AdminLayout>
    </>
  );
};

export default CategoryListPage;
