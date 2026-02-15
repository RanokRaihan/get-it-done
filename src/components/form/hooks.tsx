import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import InputWithIcon from "./InputWithIcon";
import PasswordInput from "./PasswordInput";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    InputWithIcon: InputWithIcon,
    PasswordInput: PasswordInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
export { useAppForm, useFieldContext, useFormContext };
