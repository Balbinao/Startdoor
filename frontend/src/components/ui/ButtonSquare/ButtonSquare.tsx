import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
  text: string;
  isSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  submittingText?: string;
  iconLeft?: ReactNode;
};

export const ButtonSquare = ({
  text,
  isSubmitting = false,
  onClick,
  type = 'button',
  submittingText = 'Enviando...',
  iconLeft,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className="flex w-fit max-w-96 justify-center gap-2 rounded-lg border-2 border-(--purple-500) px-5 py-3 font-semibold text-(--purple-200) transition-colors hover:bg-(--purple-500) hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {iconLeft && <span>{iconLeft}</span>}

      {isSubmitting ? submittingText : text}
    </button>
  );
};
