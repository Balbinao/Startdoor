import type { MouseEventHandler } from 'react';

type Props = {
  text: string;
  isSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  submittingText?: string;
};

export const ButtonPill = ({
  text,
  isSubmitting = false,
  onClick,
  type = 'button',
  submittingText = 'Enviando...',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className="max-w-96  w-full rounded-full bg-(--purple-400) px-2 py-3 font-semibold text-white transition-colors hover:bg-(--purple-500) disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? submittingText : text}
    </button>
  );
};
