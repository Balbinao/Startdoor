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
  label?: string;
  form?: UseFormReturn<TFormValues>;
};

export const FormFieldWrapper = <TFormValues extends FieldValues>({
  name,
  label,
  children,
  form,
}: Props<TFormValues>) => {
  const error = form
    ? (get(form.formState.errors, name) as FieldError | undefined)
    : undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-(--grey-300)">
          {label}
        </label>
      )}

      {children}

      {error?.message && (
        <span className="text-sm text-red-400">{String(error.message)}</span>
      )}
    </div>
  );
};
