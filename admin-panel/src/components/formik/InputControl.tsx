import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const InputControl = (props: any) => {
  const { label, name, ...rest } = props;
  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {label} :
        </label>
        <Field
          id={name}
          name={name}
          {...rest}
          className="form-control"
          placeholder={`Enter ${label}`}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </>
  );
};

export default InputControl;
