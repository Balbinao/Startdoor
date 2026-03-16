import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IInputDate } from '@models/input.types';
import type { FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export const FieldDate = <TFormValues extends FieldValues>({
  name,
  label,
  disabled,
  readOnly,
}: IInputDate<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <FormFieldWrapper<TFormValues> name={name} label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="date"
            disabled={disabled}
            readOnly={readOnly}
            className={`h-12 w-full rounded-lg border border-(--grey-900) bg-(--grey-1100) px-3 text-lg focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${
              disabled ? 'input-disabled' : 'cursor-text'
            } ${readOnly ? 'input-readonly' : ''}`}
          />
        )}
      />
    </FormFieldWrapper>
  );
};
