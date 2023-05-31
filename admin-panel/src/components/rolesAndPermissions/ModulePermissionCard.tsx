import React from "react";
import { Card } from "react-bootstrap";

const ModulePermissionCard = ({ moduleName, perms, removePermission }) => {
  const handleClick = (e) => {
    if (e.target.type === "checkbox") {
      removePermission(e.target.name, e.target.value);
    }
  };
  return (
    <>
      <Card
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <Card.Body>
          <Card.Title>{moduleName}</Card.Title>
          <ul className="list-group">
            {perms.map((p, i) => (
              <li className="list-group-item" key={i}>
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  id={moduleName + i}
                  value={p}
                  name={moduleName}
                  checked
                />
                <label htmlFor={moduleName + i}>{p}</label>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default ModulePermissionCard;
