import { Check, ExclamationMark, Sparkles, XClose } from '@assets/icons';
import { SupportButton } from '@components/ui/SupportButton';
import type { MessageType } from '@models/modal.types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  type: MessageType;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  shouldAcknowledge?: boolean;
}

type Variant = {
  circle: string;
  text: string;
  icon: React.ElementType;
  iconColor: string;
};

const typeStyles: Record<MessageType, Variant> = {
  success: {
    circle: 'bg-green-800',
    text: 'text-green-600',
    icon: Check,
    iconColor: 'text-(--grey-1000)',
  },
  error: {
    circle: 'bg-rose-800',
    text: 'text-rose-700',
    icon: XClose,
    iconColor: 'text-(--grey-1000)',
  },
  warning: {
    circle: 'bg-yellow-700',
    text: 'text-yellow-600',
    icon: ExclamationMark,
    iconColor: 'text-(--grey-1000)',
  },
  info: {
    circle: 'bg-sky-800',
    text: 'text-sky-600',
    icon: Sparkles,
    iconColor: 'text-(--grey-1000)',
  },
};

export const ModalMessage = ({
  type,
  message,
  onClose,
  onConfirm,
  shouldAcknowledge,
}: Props) => {
  const styles = typeStyles[type] ?? typeStyles.info;
  const Icon = styles.icon;

  useEffect(() => {
    const original = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex h-fit max-h-96 min-h-56 w-fit max-w-md min-w-2xs flex-col items-center justify-end gap-7 rounded-3xl bg-(--grey-1000) px-12 pt-18 pb-6">
        <span className="absolute top-0 flex aspect-square -translate-y-2/5 items-center justify-center rounded-full bg-(--grey-1000) p-3">
          <span
            className={`flex aspect-square items-center justify-center rounded-full p-3 ${styles.circle}`}
          >
            <Icon width={40} height={40} className={styles.iconColor} />
          </span>
        </span>

        <button className="absolute top-4 right-4" onClick={onClose}>
          <XClose
            width={24}
            height={24}
            className="cursor-pointer text-(--grey-300) transition-colors hover:text-rose-800"
          />
        </button>

        <div className="flex flex-1 items-center overflow-hidden">
          <div
            className={`${styles.text} line-clamp-9 max-h-full text-center leading-6`}
          >
            {message}
          </div>
        </div>

        {!shouldAcknowledge ? (
          <button
            className="w-26 cursor-pointer rounded-md border border-zinc-600/50 bg-zinc-700/60 py-1.5 transition-colors hover:bg-zinc-700"
            onClick={onClose}
          >
            OK
          </button>
        ) : (
          <div className="flex gap-3">
            <SupportButton
              type="button"
              variant="deny"
              text="Cancelar"
              onClick={onClose}
            />

            <SupportButton type="submit" text="Confirmar" onClick={onConfirm} />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
