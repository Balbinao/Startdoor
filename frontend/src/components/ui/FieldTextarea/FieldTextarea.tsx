import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { ITextareaField } from '@models/input.types';
import { useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type Props<TFormValues extends FieldValues> = ITextareaField<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: string;
  onChange?: (value: string) => void;
};

export const FieldTextarea = <TFormValues extends FieldValues>({
  name,
  label,
  placeholder,
  maxLength,
  disabled,
  readOnly,
  form,
  value,
  onChange,
}: Props<TFormValues>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  const render = (
    currentValue: string,
    handleChange?: (value: string) => void,
  ) => (
    <textarea
      value={currentValue ?? ''}
      onChange={e => {
        const val = e.target.value;
        handleChange?.(val);
        onChange?.(val);
      }}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      className={`scrollbar-custom h-35 max-h-70 min-h-20 w-full rounded-lg border border-(--grey-900) bg-(--grey-1100) p-3 text-3xl focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${
        disabled ? 'input-disabled' : 'cursor-text'
      } ${readOnly ? 'input-readonly' : ''}`}
    />
  );

  if (form) {
    return (
      <FormFieldWrapper<TFormValues> name={name} label={label} form={form}>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => render(field.value ?? '', field.onChange)}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper<TFormValues> name={name} label={label}>
      {render(internalValue, value => {
        setInternalValue(value);
      })}
    </FormFieldWrapper>
  );
};
