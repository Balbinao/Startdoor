import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IRadioField } from '@models/input.types';
import { useState } from 'react';
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

type Props<TFormValues extends FieldValues> = IRadioField<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export const FieldRadio = <TFormValues extends FieldValues>({
  name,
  label,
  options,
  disabled,
  readOnly,
  form,
  value,
  onChange,
}: Props<TFormValues>) => {
  const [internalValue, setInternalValue] = useState<
    string | number | undefined
  >(value);

  const render = (
    currentValue?: string | number,
    handleChange?: (value: string | number) => void,
  ) => (
    <div className="flex flex-col gap-2">
      {options.map(option => (
        <label
          key={option.value}
          className={`flex items-start gap-2 ${
            disabled ? 'input-disabled' : 'cursor-pointer'
          } ${readOnly ? 'input-readonly' : ''}`}
        >
          <input
            type="radio"
            value={option.value}
            disabled={disabled}
            readOnly={readOnly}
            checked={currentValue === option.value}
            onChange={() => {
              handleChange?.(option.value);
              onChange?.(option.value);
            }}
          />

          <div className="flex flex-col">
            <span>{option.label}</span>
            {option.desc && (
              <span className="text-xs text-(--grey-300)">{option.desc}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );

  if (form) {
    return (
      <FormFieldWrapper<TFormValues> name={name} label={label} form={form}>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) =>
            render(field.value ?? undefined, field.onChange)
          }
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
