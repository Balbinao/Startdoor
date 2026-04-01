import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { ICheckboxField } from '@models/input.types';
import { useState } from 'react';
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

type Props<TFormValues extends FieldValues> = ICheckboxField<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export const FieldCheckbox = <TFormValues extends FieldValues>({
  name,
  label,
  disabled,
  readOnly,
  form,
  value,
  onChange,
}: Props<TFormValues>) => {
  const [internalValue, setInternalValue] = useState<boolean>(value ?? false);

  const render = (
    currentValue: boolean,
    handleChange?: (value: boolean) => void,
  ) => (
    <div
      className={`flex items-start gap-2 ${
        disabled ? 'input-disabled' : 'cursor-text'
      } ${readOnly ? 'input-readonly' : ''}`}
    >
      <input
        id={name}
        type="checkbox"
        disabled={disabled}
        readOnly={readOnly}
        checked={!!currentValue}
        onChange={e => {
          const checked = e.target.checked;
          handleChange?.(checked);
          onChange?.(checked);
        }}
        style={{ marginTop: 4 }}
      />

      {label && (
        <label htmlFor={name} className="text-(--grey-300)">
          {label}
        </label>
      )}
    </div>
  );

  if (form) {
    return (
      <FormFieldWrapper<TFormValues> name={name} label={undefined} form={form}>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => render(!!field.value, field.onChange)}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper<TFormValues> name={name} label={undefined}>
      {render(internalValue, value => {
        setInternalValue(value);
      })}
    </FormFieldWrapper>
  );
};
