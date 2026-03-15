import type { ICheckboxField } from '@models/input.types';
import {
  Controller,
  useFormContext,
  type FieldError,
  type FieldValues,
} from 'react-hook-form';

export const FieldCheckbox = <TFormValues extends FieldValues>({
  name,
  label,
  disabled,
  readOnly,
}: ICheckboxField<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();
  const {
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex items-start gap-2 ${disabled ? 'input-disabled' : 'cursor-text'} ${readOnly ? 'input-readonly' : ''}`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type="checkbox"
              disabled={disabled}
              readOnly={readOnly}
              checked={field.value}
              onChange={e => field.onChange(e.target.checked)}
              style={{ marginTop: 4 }}
            />
          )}
        />

        {label && (
          <label htmlFor={name} className="text-(--grey-300)">
            {label}
          </label>
        )}
      </div>

      {error?.message && (
        <span className="text-sm text-red-400">{error.message}</span>
      )}
    </div>
  );
};
