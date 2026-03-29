export type MessageType = 'success' | 'error' | 'warning' | 'info';

type Base = {
  type: MessageType;
  message: string;
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
