import React, { useState } from "react";
import { Card, Collapse, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductFilters from "../../components/filters/productFilters";
import AdminLayout from "../../layout/admin";

const ProductListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <AdminLayout>
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
                <button
                  className="btn btn-secondary btn-sm me-3"
                  title="Apply filters"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  Filters
                  <i className="bi bi-funnel"></i>
                </button>

                <Link
                  to="/category/add"
                  className="btn btn-primary btn-sm"
                  title="Add new Product"
                >
                  Add <i className="bi bi-plus-lg" />
                </Link>
              </div>
            </div>
            <div className="filter-container position-relative">
              <Collapse in={open} dimension="height">
                <div
                  id="example-collapse-text"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 1000,
                  }}
                >
                  <Card body style={{ width: "400px" }}>
                    <ProductFilters />
                  </Card>
                </div>
              </Collapse>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Card>
                  <Card.Img variant="top" src="/images/profile-img.jpg" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <div>
                      <a
                        href="#"
                        className="btn btn-primary btn-sm me-2"
                        title="Edit Category"
                      >
                        <i className="bi bi-pencil" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-danger btn-sm"
                        title="Delete Category"
                      >
                        <i className="bi bi-trash" />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ProductListPage;
