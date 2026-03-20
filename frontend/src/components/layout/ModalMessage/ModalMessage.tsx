import { Check, ExclamationMark, Sparkles, XClose } from '@assets/icons';
import type { MessageType } from '@models/modal.types';
import { createPortal } from 'react-dom';

interface Props {
  type: MessageType;
  message: string;
  onClose: () => void;
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

export const ModalMessage = ({ type, message, onClose }: Props) => {
  const styles = typeStyles[type] ?? typeStyles.info;
  const Icon = styles.icon;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex min-h-56 max-w-sm min-w-2xs flex-col items-center justify-center gap-5 rounded-3xl bg-(--grey-1000) p-6 px-12">
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
            className="text-(--grey-300) transition-colors hover:text-rose-800"
          />
        </button>

        <div className={`${styles.text} text-center leading-6`}>{message}</div>
      </div>
    </div>,
    document.body,
  );
};
