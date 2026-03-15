import { FieldCheckbox } from '@components/ui/FieldCheckbox';
import { FieldDate } from '@components/ui/FieldDate/FieldDate';
import { FieldRadio } from '@components/ui/FieldRadio';
import { FieldSelect } from '@components/ui/FieldSelect';
import { FieldText } from '@components/ui/FieldText';
import { FieldTextarea } from '@components/ui/FieldTextarea/FieldTextarea';
import type { FieldConfig } from '@models/input.types';
import type { FieldValues } from 'react-hook-form';

export const FormField = <TFormValues extends FieldValues>(
  field: FieldConfig<TFormValues>,
) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return <FieldText<TFormValues> {...field} />;

    case 'textarea':
      return <FieldTextarea<TFormValues> {...field} />;

    case 'radio':
      return <FieldRadio<TFormValues> {...field} />;

    case 'select':
      return <FieldSelect<TFormValues> {...field} />;

    case 'checkbox':
      return <FieldCheckbox<TFormValues> {...field} />;

    case 'date':
      return <FieldDate<TFormValues> {...field} />;

    default:
      return null;
  }
};
