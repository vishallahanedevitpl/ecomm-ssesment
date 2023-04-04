import React from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../layout/admin";

const CategoryListPage = () => {
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
                <Link
                  to="/category/add"
                  className="btn btn-primary btn-sm"
                  title="Add new category"
                >
                  <i className="bi bi-plus-lg" />
                </Link>
              </div>
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

export default CategoryListPage;
