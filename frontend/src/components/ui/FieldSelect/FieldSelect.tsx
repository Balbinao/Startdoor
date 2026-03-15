import { ChevronUp } from '@assets/icons';
import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import type { ISelectField } from '@models/input.types';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';

export const FieldSelect = <TFormValues extends FieldValues>({
  name,
  label,
  disabled,
  readOnly,
  options,
}: ISelectField<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { x, y, strategy, refs, update } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(8), flip(), shift({ padding: 16 })],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.reference, refs.floating, update]);

  return (
    <FormFieldWrapper<TFormValues> name={name} label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div ref={wrapperRef} className="relative w-full">
            <button
              type="button"
              ref={refs.setReference}
              disabled={disabled}
              onClick={() => !disabled && !readOnly && setOpen(!open)}
              className={`flex h-10 w-full items-center justify-between rounded-lg border border-(--grey-900) bg-(--grey-1100) pr-3 pl-3 text-3xl focus:ring-1 focus:ring-(--purple-400) focus:outline-none ${disabled ? 'input-disabled' : 'cursor-text'} ${readOnly ? 'input-readonly' : ''}`}
            >
              {options.find(o => o.value === field.value)?.label ||
                'Selecione...'}

              {!disabled && !readOnly && (
                <ChevronUp
                  width={24}
                  height={24}
                  className={`transition-transform duration-200 ${
                    open ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              )}
            </button>
            {open && (
              <ul
                ref={refs.setFloating}
                style={{ top: y ?? 0, left: x ?? 0, position: strategy }}
                className="z-10 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-700 bg-(--grey-1100) shadow-md"
              >
                {options.map((option, index) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      field.onChange(option.value);
                      setOpen(false);
                    }}
                    className={`cursor-pointer px-3 py-2 hover:bg-(--grey-900) ${
                      index === 0 ? 'rounded-t-lg' : ''
                    } ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
    </FormFieldWrapper>
  );
};
