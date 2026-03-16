import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IRadioField } from '@models/input.types';
import {
  Controller,
  useFormContext,
  type FieldValues,
} from 'react-hook-form';

export const FieldRadio = <TFormValues extends FieldValues>({
  name,
  label,
  options,
}: IRadioField<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <FormFieldWrapper<TFormValues>
      name={name}
      label={label}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {options.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </>
        )}
      />
    </FormFieldWrapper>
  );
};
