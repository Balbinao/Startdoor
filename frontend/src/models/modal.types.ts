export type MessageType = 'success' | 'error' | 'warning' | 'info';

type Base = {
  type: MessageType;
  message: string;
};

export type ModalMessageOptions =
  | (Base & {
      shouldAcknowledge?: false;
      shouldBlockProcess?: boolean;
    })
  | (Base & {
      shouldAcknowledge: true;
    });
