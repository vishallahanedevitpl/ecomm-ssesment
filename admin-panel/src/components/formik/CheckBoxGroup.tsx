import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const CheckBoxGroup = (props: any) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {label} :
      </label>
      <div className="w-100">
        <Field name={name}>
          {({ field }: any) => {
            return options.map((option) => {
              return (
                <div className="mb-2" key={option}>
                  <input
                    type="checkbox"
                    id={option}
                    {...field}
                    {...rest}
                    value={option}
                    checked={field.value.includes(option)}
                  />
                  <label htmlFor={option} className="me-3 ms-1">
                    {option}
                  </label>
                </div>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default CheckBoxGroup;
