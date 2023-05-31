import React from "react";

const TextError = (props: any) => {
  return <div className="invalid-feedback d-block">{props.children}</div>;
};

export default TextError;
