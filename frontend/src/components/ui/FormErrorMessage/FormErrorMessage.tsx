import { useFormContext } from 'react-hook-form';

export const FormErrorMessage = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const serverError = errors.root?.serverError as
    | { message?: string }
    | undefined;

  if (!serverError) return null;

  return <div className="text-center text-red-400">{serverError.message}</div>;
};
