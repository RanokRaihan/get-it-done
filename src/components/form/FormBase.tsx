import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { useFieldContext } from "./hooks";

export type FormControlProps = {
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
};
export type FormBaseProps = FormControlProps & {
  children: React.ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
};

const FormBase = ({
  children,
  label,
  description,
  horizontal,
  controlFirst,
}: FormBaseProps) => {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );
  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  );
};

export default FormBase;
