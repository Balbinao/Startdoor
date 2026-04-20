import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { IDoubleRangeField, RangeValue } from '@models/input.types';
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import Styles from './FieldDoubleRange.module.css';

type Props<TFormValues extends FieldValues> = IDoubleRangeField<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: RangeValue;
  onChange?: (value: RangeValue) => void;
};

export const FieldDoubleRange = <TFormValues extends FieldValues>({
  name,
  label,
  minLimit,
  maxLimit,
  step = 1,
  form,
  value,
  unitType,
  onChange,
  disabled,
  // readOnly,
}: Props<TFormValues>) => {
  const handleChange = (
    newValue: RangeValue,
    internalOnChange?: (value: RangeValue) => void,
  ) => {
    internalOnChange?.(newValue);
    onChange?.(newValue);
  };

  const render = (
    currentValue: RangeValue,
    internalOnChange?: (value: RangeValue) => void,
  ) => {
    const { min: currentMin, max: currentMax } = currentValue;

    const getPercent = (value: number) =>
      ((value - minLimit) / (maxLimit - minLimit)) * 100;
    const minPercent = getPercent(currentMin);
    const maxPercent = getPercent(currentMax);

    const handleMinChange = (val: number) => {
      let newMin = val;
      let newMax = currentMax;

      if (newMin >= newMax) {
        newMax = Math.min(maxLimit, newMin + step);
        newMin = Math.min(maxLimit, newMax - step);
      }

      const newValue = { min: newMin, max: newMax };
      handleChange(newValue, internalOnChange);
    };

    const handleMaxChange = (val: number) => {
      let newMax = val;
      let newMin = currentMin;

      if (newMax <= newMin) {
        newMin = Math.max(minLimit, newMax - step);
        newMax = Math.max(minLimit, newMin + step);
      }

      const newValue = { min: newMin, max: newMax };
      handleChange(newValue, internalOnChange);
    };

    return (
      <div className="flex flex-col gap-4 rounded-lg border border-(--grey-900) bg-(--grey-1100) p-3">
        <div className="flex w-full justify-between">
          <span>
            {label && <label className="text-(--grey-300)">{label}</label>}
          </span>
          <span className="text-sm font-semibold text-(--grey-200)">
            {unitType} {currentMin} — {unitType} {currentMax}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <div className="relative">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-(--grey-700)" />

              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-(--purple-400)"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />
            </div>

            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              step={step}
              value={currentMin}
              onChange={e => handleMinChange(Number(e.target.value))}
              disabled={disabled}
              className={`pointer-events-none absolute top-1/2 w-full -translate-y-1/2 appearance-none ${Styles.thumb}`}
            />

            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              step={step}
              value={currentMax}
              onChange={e => handleMaxChange(Number(e.target.value))}
              disabled={disabled}
              className={`pointer-events-none absolute top-1/2 w-full -translate-y-1/2 appearance-none ${Styles.thumb}`}
            />
          </div>

          <div className="flex w-full justify-between text-sm text-(--grey-300)">
            <span>
              <label className="">
                {unitType} {minLimit}
              </label>
            </span>
            <span>
              <label className="">
                {unitType} {maxLimit}
              </label>
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (form) {
    return (
      <FormFieldWrapper<TFormValues> name={name} inputId="" form={form}>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) =>
            render(
              field.value ?? { min: minLimit, max: maxLimit },
              field.onChange,
            )
          }
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper<TFormValues> name={name} inputId="">
      {render(value ?? { min: minLimit, max: maxLimit }, onChange)}
    </FormFieldWrapper>
  );
};
