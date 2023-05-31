import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setError, setLoading } from "../../features/generalSlice";
import AdminLayout from "../../layout/admin";
import DataTable from "react-data-table-component";
import FormContainerModal from "../../components/modals/FormContainerModal";
import UpsertSubCategoryForm from "../../components/forms/category/UpsertSubCategoryForm";
import hitApi from "../../services/apiService";
import {
  setCategories,
  setSubCategories,
  setSubCategory,
} from "../../features/categorySlice";
import { setFormModalShow } from "../../features/modalSlice";
import AlertMessage from "../../components/common/AlertMessage";
import UpdateSubCategoryImageForm from "../../components/forms/category/UpdateSubCategoryImageForm";

const SubCategoryListPage = () => {
  const dispatch = useDispatch();
  //states and props
  const { catId } = useParams();
  const { subCategories, subCategory } = useSelector(
    (state: any) => state.category
  );
  const { isError, isSuccess, user } = useSelector(
    (state: any) => state.general
  );
  const [formInModal, setFormInModal] = useState<string>("SUB_CAT");

  //API calls
  const fetchInitialData = async () => {
    dispatch(setLoading(true));
    //fetch sub categories
    const data = await hitApi("GET", `/subCategory/list/${catId}`);
    if (data.status === 200) {
      dispatch(setSubCategories(data.result));
    } else {
      dispatch(setError(data.message));
    }

    //fetch sub categories
    const cats = await hitApi("GET", "/category/list");
    if (cats.status === 200) {
      dispatch(setCategories(cats.result));
      dispatch(setLoading(false));
    } else {
      dispatch(setError(data.message));
    }

    dispatch(
      setSubCategory({
        id: null,
        categoryId: catId,
        subCatName: null,
        subCatImage: null,
      })
    );
  };

  //Fetch sub cat details
  const getSubCatToEdit = async (id: number, formName: string) => {
    const sc = await hitApi("GET", `/subCategory/details/${id}`);
    if (sc.status === "success") {
      dispatch(setSubCategory(sc.result));
    }
    setFormInModal(formName);
    dispatch(setFormModalShow(true));
  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Data table columns
  const columns = [
    {
      name: "Category",
      selector: (row: any) => row.subCatName,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row: any) => (
        <>
          <img
            style={{ width: "100px" }}
            src={
              row.subCatImage
                ? `${process.env.REACT_APP_SERVER_URL + row.subCatImage}`
                : "/images/category.jpg"
            }
          />
        </>
      ),
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          {/* Access control check */}
          {user.role.permissions.includes("SUB_CATEGORY_UPSERT") && (
            <>
              <button
                className="btn btn-primary btn-sm me-2"
                title="Edit Sub Category"
                onClick={() => {
                  getSubCatToEdit(row.id, "SUB_CAT");
                }}
              >
                <i className="bi bi-pencil" />
              </button>
              <button
                className="btn btn-info btn-sm me-2"
                title="Change Image"
                onClick={() => {
                  getSubCatToEdit(row.id, "SUB_CAT_IMAGE");
                }}
              >
                <i className="bi bi-image" />
              </button>
              <a
                href="#"
                className="btn btn-danger btn-sm"
                title="Delete Sub Category"
              >
                <i className="bi bi-trash" />
              </a>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <AdminLayout
        pageTitle="Sub Categories"
        breadcrumbs={[
          {
            title: `Categories`,
            link: "/category",
            isActive: false,
          },
          {
            title: subCategories.catName,
            isActive: false,
          },
          { title: "Sub Categories", isActive: true },
        ]}
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
                  {user.role.permissions.includes("SUB_CATEGORY_UPSERT") && (
                    <button
                      className="btn btn-primary btn-sm"
                      title="Add new sub category"
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
                <DataTable
                  columns={columns}
                  data={subCategories.subCategories}
                />
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
      {/* Modal Container */}
      <FormContainerModal
        modalTitle={
          subCategory.id ? "update sub category" : "Add new sub ctegory"
        }
        formKey="SUB_CAT_FORM"
      >
        {formInModal === "SUB_CAT" ? (
          <UpsertSubCategoryForm />
        ) : (
          <UpdateSubCategoryImageForm />
        )}
      </FormContainerModal>
    </>
  );
};

export default SubCategoryListPage;
