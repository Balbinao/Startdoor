import { FieldCheckbox } from '@components/ui/FieldCheckbox';
import { FieldDate } from '@components/ui/FieldDate/FieldDate';
import { FieldDoubleRange } from '@components/ui/FieldDoubleRange';
import { FieldRadio } from '@components/ui/FieldRadio';
import { FieldSelect } from '@components/ui/FieldSelect';
import { FieldText } from '@components/ui/FieldText';
import { FieldTextarea } from '@components/ui/FieldTextarea/FieldTextarea';
import type { FieldConfig, RangeValue } from '@models/input.types';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldOnChange =
  | { type: 'checkbox'; onChange?: (value: boolean) => void }
  | { type: 'select' | 'radio'; onChange?: (value: string | number) => void }
  | {
      type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'date';
      onChange?: (value: string) => void;
    }
  | {
      type: 'doubleRange';
      onChange?: (value: RangeValue) => void;
    };

type Props<TFormValues extends FieldValues> = FieldConfig<TFormValues> & {
  form?: UseFormReturn<TFormValues>;
} & FieldOnChange;

export const FormField = <TFormValues extends FieldValues>(
  props: Props<TFormValues>,
) => {
  const { form, ...field } = props;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return <FieldText<TFormValues> {...field} form={form} />;

    case 'textarea':
      return <FieldTextarea<TFormValues> {...field} form={form} />;

    case 'radio':
      return <FieldRadio<TFormValues> {...field} form={form} />;

    case 'select':
      return <FieldSelect<TFormValues> {...field} form={form} />;

    case 'checkbox':
      return <FieldCheckbox<TFormValues> {...field} form={form} />;

    case 'date':
      return <FieldDate<TFormValues> {...field} form={form} />;

    case 'doubleRange':
      return <FieldDoubleRange<TFormValues> {...field} form={form} />;

    default:
      return null;
  }
};
