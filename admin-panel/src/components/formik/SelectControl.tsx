import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const SelectControl = (props: any) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {label} :
      </label>
      <Field
        as="select"
        className="form-control"
        id={name}
        name={name}
        {...rest}
      >
        <option value="">Select...</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default SelectControl;
