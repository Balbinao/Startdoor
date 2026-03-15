import type { ReactNode } from 'react';
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  children: ReactNode;
};

export const FormWrapper = <TFormValues extends FieldValues>({
  form,
  children,
}: Props<TFormValues>) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};
