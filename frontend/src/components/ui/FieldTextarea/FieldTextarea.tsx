import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { ITextareaField } from '@models/input.types';
import type { FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export const FieldTextarea = <TFormValues extends FieldValues>({
  name,
  label,
  placeholder,
  maxLength,
  disabled,
  readOnly,
}: ITextareaField<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  return (
    <FormFieldWrapper<TFormValues> name={name} label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            className={`h-35 max-h-70 min-h-20 w-full rounded-lg border border-(--grey-900) bg-(--grey-1100) p-3 text-3xl focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${disabled ? 'input-disabled' : 'cursor-text'} ${readOnly ? 'input-readonly' : ''}`}
          />
        )}
      />
    </FormFieldWrapper>
  );
};
