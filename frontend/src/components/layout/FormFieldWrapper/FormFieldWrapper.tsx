import type { ReactNode } from 'react';
import {
  useFormContext,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  children: ReactNode;
  label?: string;
};

export const FormFieldWrapper = <TFormValues extends FieldValues>({
  name,
  label,
  children,
}: Props<TFormValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-(--grey-300)">
          {label}
        </label>
      )}

      {children}

      {error?.message && (
        <span className="text-sm text-red-400">{error.message}</span>
      )}
    </div>
  );
};
