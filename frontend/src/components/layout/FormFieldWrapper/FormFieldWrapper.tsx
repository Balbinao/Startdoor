import type { ReactNode } from 'react';
import {
  get,
  type FieldError,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  children: ReactNode;
  inputId: string;
  label?: string;
  form?: UseFormReturn<TFormValues>;
  required?: boolean;
  onClick?: () => void;
};

export const FormFieldWrapper = <TFormValues extends FieldValues>({
  name,
  children,
  inputId,
  label,
  form,
  required,
  onClick,
}: Props<TFormValues>) => {
  const error = form
    ? (get(form.formState.errors, name) as FieldError | undefined)
    : undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          onClick={onClick}
          className="text-(--grey-300)"
        >
          {label}
          {required && <span className="ml-1 text-rose-400">*</span>}
        </label>
      )}

      {children}

      {error?.message && (
        <span className="text-sm font-thin text-red-400">
          {String(error.message)}
        </span>
      )}
    </div>
  );
};
