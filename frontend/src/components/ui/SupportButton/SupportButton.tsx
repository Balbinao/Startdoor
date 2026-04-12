import type { MouseEventHandler } from 'react';

interface Props {
  text: string;
  isSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  submittingText?: string;
  variant?: 'accept' | 'deny';
}

export const SupportButton = ({
  text,
  isSubmitting = false,
  onClick,
  type = 'button',
  submittingText = 'Enviando...',
  variant = 'accept',
}: Props) => {
  const baseClass =
    'w-fit cursor-pointer rounded-md px-2 py-1 text-sm transition-colors';

  const acceptClass =
    'border border-(--blue-100) bg-(--blue-400) text-(--blue-100) hover:bg-blue-950';

  const denyClass =
    'border border-red-400/70 bg-red-900/10 text-red-400/90 hover:bg-pink-950';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className={`${baseClass} ${variant === 'accept' ? acceptClass : denyClass}`}
    >
      {isSubmitting ? submittingText : text}
    </button>
  );
};
