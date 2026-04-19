import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { ICheckboxField } from '@models/input.types';
import { useId } from 'react';
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import Styles from './FieldCheckbox.module.css';

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
  const uniqueId = useId();
  const inputId = `checkbox-${name}-${uniqueId}`;
  const symbolId = `checkbox-symbol-${name}-${uniqueId}`;

  const render = (
    currentValue: boolean,
    handleChange?: (value: boolean) => void,
  ) => {
    return (
      <label
        htmlFor={inputId}
        className={`flex items-start gap-2.5 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        <div className={Styles.checkboxWrapper}>
          <span className={Styles.checkbox}>
            <input
              id={inputId}
              type="checkbox"
              checked={!!currentValue}
              disabled={disabled}
              readOnly={readOnly}
              onChange={e => {
                const checked = e.target.checked;
                handleChange?.(checked);
                onChange?.(checked);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();

                  const nextValue = !currentValue;
                  handleChange?.(nextValue);
                  onChange?.(nextValue);
                }
              }}
            />
            <svg>
              <use xlinkHref={`#${symbolId}`} />
            </svg>
          </span>

          <svg className="hidden">
            <symbol id={symbolId} viewBox="0 0 22 22">
              <path
                className="text-(--grey-300)"
                fill="none"
                stroke="currentColor"
                d="M5.5,11.3L9,14.8L20.2,3.3c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
              />
            </symbol>
          </svg>
        </div>

        {label && <span className="leading-6 text-(--grey-300)">{label}</span>}
      </label>
    );
  };

  if (form) {
    return (
      <FormFieldWrapper<TFormValues> name={name} inputId={inputId} form={form}>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => render(!!field.value, field.onChange)}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper<TFormValues> name={name} inputId={inputId}>
      {render(value ?? false, onChange)}
    </FormFieldWrapper>
  );
};
