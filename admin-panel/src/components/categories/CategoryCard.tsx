import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CategoryModel } from "../../models/data";
type PropsType = {
  category: CategoryModel;
};
const CategoryCard = ({ category }: PropsType) => {
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            category.catImage
              ? `${process.env.REACT_APP_SERVER_URL + category.catImage}`
              : "/images/category.jpg"
          }
        />
        <Card.Body>
          <Card.Title>{category.catName}</Card.Title>
          <div>
            <Link
              to={`/category/edit/${category.id}`}
              className="btn btn-primary btn-sm me-2"
              title="Edit Category"
            >
              <i className="bi bi-pencil" />
            </Link>
            <Link
              to={`/category/sub-categories/${category.id}`}
              className="btn btn-info text-white btn-sm me-2"
              title="View Sub Category List"
            >
              <i className="bi bi-list-nested" />
            </Link>
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
    </>
  );
};

export default CategoryCard;
