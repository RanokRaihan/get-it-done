"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import FormBase, { FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";
type InputWithIconProps = FormControlProps & {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const InputWithIcon = ({ icon: Icon, type, ...props }: InputWithIconProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <InputGroup>
        <InputGroupInput
          id={field.name}
          type={type || "text"}
          name={field.name}
          onBlur={field.handleBlur}
          value={field.state.value}
          placeholder={props.placeholder}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className="h-full"
        />
        <InputGroupAddon>
          <Icon />
        </InputGroupAddon>
      </InputGroup>
    </FormBase>
  );
};

export default InputWithIcon;
