import { CalendarEvent, XClose } from '@assets/icons';
import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IInputDate } from '@models/input.types';
import { useId, useRef } from 'react';
import type { FieldValues, PathValue, UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type Props<TFormValues extends FieldValues> = IInputDate<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: string;
  onChange?: (value: string) => void;
};

export const FieldDate = <TFormValues extends FieldValues>({
  name,
  label,
  disabled,
  readOnly,
  min,
  max,
  form,
  value,
  onChange,
}: Props<TFormValues>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputId = `date-${name}-${useId()}`;

  const handleOpenPicker = () => {
    if (inputRef.current && 'showPicker' in inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  const render = (
    currentValue?: string,
    handleChange?: (value: string) => void,
    handleClear?: () => void,
  ) => (
    <div className="relative w-full">
      <input
        id={inputId}
        ref={inputRef}
        type="date"
        value={currentValue ?? ''}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={readOnly}
        onChange={e => {
          handleChange?.(e.target.value);
          onChange?.(e.target.value);
        }}
        className={`h-12 w-full rounded-lg border border-(--grey-900) bg-(--grey-1100) px-3 text-sm focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${
          !disabled && !readOnly && currentValue ? 'pr-10' : ''
        } ${disabled ? 'input-disabled' : 'cursor-text'} ${
          readOnly ? 'input-readonly' : ''
        }`}
      />

      <div
        className={`absolute top-1/2 -translate-y-1/2 text-(--grey-100) opacity-70 ${
          !disabled && !readOnly && currentValue ? 'right-11' : 'right-4'
        } cursor-pointer`}
        onClick={handleOpenPicker}
      >
        <CalendarEvent width={20} height={20} />
      </div>

      {!disabled && !readOnly && currentValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-4 -translate-y-4/9 cursor-pointer text-sm text-red-200/70"
        >
          <XClose width={22} height={22} />
        </button>
      )}
    </div>
  );

  if (form) {
    return (
      <FormFieldWrapper<TFormValues>
        name={name}
        inputId={inputId}
        label={label}
        form={form}
      >
        <Controller
          name={name}
          control={form.control}
          render={({ field }) =>
            render(field.value ?? '', field.onChange, () =>
              form.setValue(name, '' as PathValue<TFormValues, typeof name>, {
                shouldValidate: true,
                shouldDirty: true,
              }),
            )
          }
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper<TFormValues> name={name} inputId={inputId} label={label}>
      {render(value ?? '', onChange, () => {
        onChange?.('');
      })}
    </FormFieldWrapper>
  );
};
