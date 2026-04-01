import { Eye, EyeOff } from '@assets/icons';
import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { ITextField } from '@models/input.types';
import { useState } from 'react';
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import { FieldInput } from '../FieldInput';

type Props<TFormValues extends FieldValues> = ITextField<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
  value?: string;
  onChange?: (value: string) => void;
};

export const FieldText = <TFormValues extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  disabled,
  readOnly,
  maxLength,
  iconLeft,
  iconLeftOnClick,
  iconRight,
  iconRightOnClick,
  form,
  value,
  onChange,
}: Props<TFormValues>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const rightIcon =
    iconRight ??
    (isPassword ? (
      <button
        type="button"
        onClick={() => !disabled && setShowPassword(psw => !psw)}
        onMouseDown={e => e.preventDefault()}
        className={`${disabled ? 'input-disabled' : 'cursor-text'}`}
      >
        {showPassword ? (
          <EyeOff width={24} height={24} className="text-(--grey-400)" />
        ) : (
          <Eye width={24} height={24} className="text-(--grey-400)" />
        )}
      </button>
    ) : null);

  const render = (
    currentValue: string,
    handleChange?: (value: string) => void,
  ) => (
    <FieldInput
      id={name}
      type={inputType}
      value={currentValue ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={maxLength}
      onChange={e => {
        let val = e.target.value;

        if (maxLength) {
          val = val.slice(0, maxLength);
        }

        handleChange?.(val);
        onChange?.(val);
      }}
      iconLeft={
        iconLeft &&
        (iconLeftOnClick ? (
          <button type="button" onClick={iconLeftOnClick}>
            {iconLeft}
          </button>
        ) : (
          iconLeft
        ))
      }
      iconRight={
        rightIcon &&
        (iconRightOnClick ? (
          <button type="button" onClick={iconRightOnClick}>
            {rightIcon}
          </button>
        ) : (
          rightIcon
        ))
      }
    />
  );

  if (form) {
    return (
      <FormFieldWrapper name={name} label={label} form={form}>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => render(field.value ?? '', field.onChange)}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper name={name} label={label}>
      {render(internalValue, value => {
        setInternalValue(value);
      })}
    </FormFieldWrapper>
  );
};
