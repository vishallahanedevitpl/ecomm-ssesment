import CheckBoxGroup from "./CheckBoxGroup";
import InputControl from "./InputControl";
import SelectControl from "./SelectControl";

const FormikControl = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputControl {...rest} />;

    case "checkboxgroup":
      return <CheckBoxGroup {...rest} />;

    case "select":
      return <SelectControl {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
