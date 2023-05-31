import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SubCategoryCard = ({ subCategory }: any) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          subCategory.subCatImage
            ? `${process.env.REACT_APP_SERVER_URL + subCategory.subCatImage}`
            : "/images/category.jpg"
        }
      />
      <Card.Body>
        <Card.Title>{subCategory.subCatName}</Card.Title>
        <div>
          <Link
            to={`/category/sub-categories/edit/${subCategory.id}`}
            className="btn btn-primary btn-sm me-2"
            title="Edit Category"
          >
            <i className="bi bi-pencil" />
          </Link>
          <a href="#" className="btn btn-danger btn-sm" title="Delete Category">
            <i className="bi bi-trash" />
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SubCategoryCard;
