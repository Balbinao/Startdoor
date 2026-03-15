import type { FieldValues, Path } from 'react-hook-form';

type FieldName<T extends FieldValues> = Path<T>;

export type IInputOption = {
  label: string;
  value: string | number;
};

type IBaseField<T extends FieldValues> = {
  name: FieldName<T>;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type ITextField<T extends FieldValues> = IBaseField<T> & {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  maxLength?: number;
  iconLeft?: React.ReactNode;
  iconLeftOnClick?: () => void;
  iconRight?: React.ReactNode;
  iconRightOnClick?: () => void;
};

export type ITextareaField<T extends FieldValues> = IBaseField<T> & {
  type: 'textarea';
  placeholder?: string;
  maxLength?: number;
};

export type IRadioField<T extends FieldValues> = IBaseField<T> & {
  type: 'radio';
  options: IInputOption[];
};

export type ISelectField<T extends FieldValues> = IBaseField<T> & {
  type: 'select';
  options: IInputOption[];
};

export type ICheckboxField<T extends FieldValues> = IBaseField<T> & {
  type: 'checkbox';
};

export type FieldConfig<T extends FieldValues> =
  | ITextField<T>
  | ITextareaField<T>
  | IRadioField<T>
  | ISelectField<T>
  | ICheckboxField<T>;
