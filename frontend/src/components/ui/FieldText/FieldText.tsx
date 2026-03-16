import { Eye, EyeOff } from '@assets/icons';
import { FormFieldWrapper } from '@components/layout/FormFieldWrapper';
import type { ITextField } from '@models/input.types';
import { useState } from 'react';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import { FieldInput } from '../FieldInput';
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
}: ITextField<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();
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

  return (
    <FormFieldWrapper name={name} label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FieldInput
            {...field}
            id={name}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            onChange={e => {
              let value = e.target.value;
              if (maxLength) {
                value = value.slice(0, maxLength);
              }
              field.onChange(value);
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
        )}
      />
    </FormFieldWrapper>
  );
};
