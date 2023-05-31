import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../../features/generalSlice";
const AlertMessage = () => {
  const [show, setShow] = useState<boolean>(true);
  const { alertMessage, isError } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();
  const closeAlert = () => {
    dispatch(resetAlert());
    setShow(false);
  };
  return (
    <>
      <Alert
        show={show}
        variant={isError ? "danger" : "success"}
        onClose={() => closeAlert()}
        dismissible
      >
        <p className="mb-0">{alertMessage}</p>
      </Alert>
    </>
  );
};

export default AlertMessage;
