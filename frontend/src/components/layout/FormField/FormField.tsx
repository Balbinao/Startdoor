import { FieldCheckbox } from '@components/ui/FieldCheckbox';
import { FieldRadio } from '@components/ui/FieldRadio';
import { FieldSelect } from '@components/ui/FieldSelect';
import { FieldText } from '@components/ui/FieldText';
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
      return <FieldText {...field} />;

    case 'radio':
      return <FieldRadio {...field} />;

    case 'select':
      return <FieldSelect {...field} />;

    case 'checkbox':
      return <FieldCheckbox {...field} />;

    default:
      return null;
  }
};
