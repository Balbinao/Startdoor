export type MessageType = 'success' | 'error' | 'warning' | 'info';

export interface ModalMessageOptions {
  type: MessageType;
  message: string;
  shouldBlockProcess?: boolean;
}
