import type { FieldValues, Path } from 'react-hook-form';

export type InputMask = 'cpf' | 'cnpj' | 'cep' | 'phone' | 'mobile' | 'rg';

export const maskLengths: Partial<Record<InputMask, number>> = {
  cpf: 11,
  cnpj: 14,
  cep: 8,
  phone: 10,
  mobile: 11,
  rg: 9,
};

type FieldName<T extends FieldValues> = Path<T>;

export type IInputOption = {
  label: string;
  value: string | number;
  desc?: string;
};

export type RangeValue = {
  min: number;
  max: number;
};

type IBaseField<T extends FieldValues> = {
  name: FieldName<T>;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type ITextField<T extends FieldValues> = IBaseField<T> & {
  type: 'text' | 'email' | 'password' | 'number';
  value?: string;
  placeholder?: string;
  maxLength?: number;
  mask?: InputMask;
  iconLeft?: React.ReactNode;
  iconLeftOnClick?: () => void;
  iconRight?: React.ReactNode;
  iconRightOnClick?: () => void;
};

export type ITextareaField<T extends FieldValues> = IBaseField<T> & {
  type: 'textarea';
  value?: string;
  placeholder?: string;
  maxLength?: number;
};

export type IRadioField<T extends FieldValues> = IBaseField<T> & {
  type: 'radio';
  options: IInputOption[];
  value?: string | number;
};

export type ISelectField<T extends FieldValues> = IBaseField<T> & {
  type: 'select';
  options: IInputOption[];
  value?: string | number;
  iconLeft?: React.ReactNode;
  className?: string;
};

export type ICheckboxField<T extends FieldValues> = IBaseField<T> & {
  type: 'checkbox';
  value?: boolean;
};

export type IInputDate<T extends FieldValues> = IBaseField<T> & {
  type: 'date';
  value?: string;
  min?: string;
  max?: string;
};

export type IDoubleRangeField<T extends FieldValues> = IBaseField<T> & {
  type: 'doubleRange';
  minLimit: number;
  maxLimit: number;
  value?: RangeValue;
  step?: number;
  unitType?: string;
};

export type FieldConfig<T extends FieldValues> =
  | ITextField<T>
  | ITextareaField<T>
  | IRadioField<T>
  | ISelectField<T>
  | ICheckboxField<T>
  | IInputDate<T>
  | IDoubleRangeField<T>;
