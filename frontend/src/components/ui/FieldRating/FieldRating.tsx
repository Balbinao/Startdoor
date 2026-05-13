import { Star, XClose } from '@assets/icons';
import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IRatingField } from '@models/input.types';
import { useId, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type Props<TFormValues extends FieldValues> = IRatingField<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: number;
  onChange?: (value: number) => void;
};

export const FieldRating = <TFormValues extends FieldValues>({
  name,
  label,
  required,
  disabled,
  readOnly,
  form,
  value,
  onChange,
  maxStars = 5,
}: Props<TFormValues>) => {
  const inputId = `rating-${name}-${useId()}`;

  const [hoverValue, setHoverValue] = useState(0);

  const render = (
    currentValue: number,
    handleChange?: (value: number) => void,
  ) => {
    const displayValue = hoverValue || currentValue || 0;

    const handleSelect = (selectedValue: number) => {
      if (disabled || readOnly) return;

      handleChange?.(selectedValue);
      onChange?.(selectedValue);
    };

    const handleClear = () => {
      if (disabled || readOnly) return;

      handleChange?.(0);
      onChange?.(0);
    };

    return (
      <div className="flex items-center gap-4">
        {label && (
          <label htmlFor={inputId} className="text-sm text-(--grey-300)">
            {label}
            {required && <span className="ml-1 text-rose-400">*</span>}
          </label>
        )}

        <div className="flex items-center">
          {Array.from({ length: maxStars }).map((_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= displayValue;

            return (
              <button
                key={starValue}
                type="button"
                disabled={disabled}
                onMouseEnter={() => setHoverValue(starValue)}
                onMouseLeave={() => setHoverValue(0)}
                onClick={() => handleSelect(starValue)}
                className={`p-0.5 transition-transform ${
                  disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:scale-120'
                }`}
              >
                <Star
                  width={20}
                  height={20}
                  className={`text-yellow-500 transition-colors ${
                    isFilled ? 'fill-(--yellow-100)' : ''
                  }`}
                />
              </button>
            );
          })}

          {currentValue > 0 && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled || readOnly}
              className={`ml-1 p-0.5 text-(--grey-500) transition-opacity hover:text-red-400 ${
                disabled || readOnly
                  ? 'cursor-not-allowed opacity-40'
                  : 'cursor-pointer opacity-70 hover:opacity-100'
              }`}
            >
              <XClose width={18} height={18} className="transition-colors" />
            </button>
          )}
        </div>

        <input id={inputId} type="hidden" value={currentValue ?? 0} readOnly />
      </div>
    );
  };

  if (form) {
    return (
      <FormFieldWrapper<TFormValues>
        name={name}
        inputId={inputId}
        label=""
        form={form}
        required={required}
      >
        <Controller
          name={name}
          control={form.control}
          render={({ field }) =>
            render(Number(field.value ?? 0), value => {
              field.onChange(value);
              onChange?.(value);
            })
          }
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper<TFormValues>
      name={name}
      inputId={inputId}
      required={required}
    >
      {render(value ?? 0, onChange)}
    </FormFieldWrapper>
  );
};
