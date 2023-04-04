import React from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";

const ProductFilters = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>Price Range</Col>
            <Col>
              <Form.Control type={"number"} size="sm" />
            </Col>
            <Col>
              <Form.Control type={"number"} size="sm" />
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ProductFilters;
