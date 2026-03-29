import { CalendarEvent, XClose } from '@assets/icons';
import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IInputDate } from '@models/input.types';
import { useRef } from 'react';
import type { FieldValues, PathValue } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export const FieldDate = <TFormValues extends FieldValues>({
  name,
  label,
  disabled,
  readOnly,
}: IInputDate<TFormValues>) => {
  const { control, setValue } = useFormContext<TFormValues>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenPicker = () => {
    if (inputRef.current && inputRef.current.showPicker) {
      inputRef.current.showPicker();
    }
  };

  return (
    <FormFieldWrapper<TFormValues> name={name} label={label}>
      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                ref={e => {
                  field.ref(e);
                  inputRef.current = e;
                }}
                type="date"
                disabled={disabled}
                readOnly={readOnly}
                className={`h-12 w-full rounded-lg border border-(--grey-900) bg-(--grey-1100) px-3 text-lg focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${
                  !disabled && !readOnly && field.value ? 'pr-10' : ''
                } ${disabled ? 'input-disabled' : 'cursor-text'} ${
                  readOnly ? 'input-readonly' : ''
                }`}
              />

              <div
                className={`absolute top-1/2 -translate-y-1/2 text-(--grey-100) opacity-70 ${
                  !disabled && !readOnly && field.value ? 'right-11' : 'right-4'
                } cursor-pointer`}
                onClick={handleOpenPicker}
              >
                <CalendarEvent width={20} height={20} />
              </div>

              {!disabled && !readOnly && field.value && (
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      name,
                      '' as unknown as PathValue<TFormValues, typeof name>,
                      { shouldValidate: true, shouldDirty: true },
                    )
                  }
                  className="absolute top-1/2 right-4 -translate-y-4/9 cursor-pointer text-sm text-red-200/70"
                >
                  <XClose width={22} height={22} />
                </button>
              )}
            </>
          )}
        />
      </div>
    </FormFieldWrapper>
  );
};
