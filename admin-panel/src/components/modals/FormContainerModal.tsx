import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSubCategory } from "../../features/categorySlice";
import { setSingleRole } from "../../features/dynamicDataSlice";
import { setFormModalShow } from "../../features/modalSlice";
const FormContainerModal = ({
  children,
  modalTitle,
  formKey,
  size = "md",
}: any) => {
  const { formModalShow } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const resetStateVariables = () => {
    switch (formKey) {
      case "ROLE_FORM":
        dispatch(setSingleRole({}));
        break;
      case "CATEGORY_FORM":
        dispatch(
          setCategory({
            id: null,
            catName: null,
            catImage: null,
          })
        );
        break;
      case "SUB_CAT_FORM":
        dispatch(
          setSubCategory({
            id: null,
            categoryId: null,
            subCatName: null,
            subCatImage: null,
          })
        );
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    dispatch(setFormModalShow(false));
    resetStateVariables();
  };
  return (
    <>
      <Modal show={formModalShow} size={size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default FormContainerModal;
