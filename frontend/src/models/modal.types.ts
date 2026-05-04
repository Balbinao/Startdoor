import type { CSSProperties, ReactNode } from 'react';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

type Base = {
  type: MessageType;
  message: ReactNode;
  styles?: CSSProperties;
};

export type ModalMessageOptions =
  | (Base & {
      shouldAcknowledge?: false;
      shouldBlockProcess?: boolean;
      onClose?: () => void;
    })
  | (Base & {
      shouldAcknowledge: true;
      onClose?: () => void;
    });
