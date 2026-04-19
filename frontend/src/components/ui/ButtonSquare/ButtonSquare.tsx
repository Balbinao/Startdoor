import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
  text: string;
  isSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  submittingText?: string;
  iconLeft?: ReactNode;
  className?: string;
};

export const ButtonSquare = ({
  text,
  isSubmitting = false,
  onClick,
  type = 'button',
  submittingText = 'Enviando...',
  iconLeft,
  className = '',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className={`flex w-fit cursor-pointer items-center justify-center gap-2.5 rounded-lg border-2 border-(--purple-500) px-5 py-3 font-semibold text-(--purple-200) transition-colors hover:bg-(--purple-500) hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
    >
      {iconLeft && <span>{iconLeft}</span>}

      {isSubmitting ? submittingText : text}
    </button>
  );
};
