import React, { useEffect, useState } from "react";
import { Card, Collapse, Form, InputGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductFilters from "../../components/filters/productFilters";
import { setError, setLoading } from "../../features/generalSlice";
import { setProductList } from "../../features/productSlice";
import AdminLayout from "../../layout/admin";
import hitApi from "../../services/apiService";

const ProductListPage = () => {
  const dispatch = useDispatch();
  //States
  const [open, setOpen] = useState(false);
  const {
    product: { productList },
  } = useSelector((state: any) => state);

  //API calls
  const fetchProducts = async () => {
    dispatch(setLoading(true));
    const products = await hitApi("GET", "/product/getList");
    if (products.status === "success") {
      dispatch(setProductList(products.result));
      console.log(products);

      dispatch(setLoading(false));
    } else {
      dispatch(setError(products.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //Static data
  //Data table columns
  const columns = [
    {
      name: "Product",
      selector: (row: any) => row.productName,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: any) => row.productName,
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
          <>
            <button className="btn btn-danger btn-sm" title="Delete Category">
              <i className="bi bi-trash" />
            </button>
          </>
        </>
      ),
    },
  ];
  return (
    <AdminLayout
      pageTitle="Products"
      breadcrumbs={[{ title: "Products", isActive: true }]}
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
                <Link
                  to="/product/add"
                  className="btn btn-primary btn-sm"
                  title="Add new Product"
                >
                  Add <i className="bi bi-plus-lg" />
                </Link>
              </div>
            </div>
            <div className="row">
              <DataTable columns={columns} data={productList} />
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ProductListPage;
