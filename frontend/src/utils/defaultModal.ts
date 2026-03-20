import { RESPONSE_MESSAGE } from '@constants';
import type { ModalMessageOptions } from '@models/modal.types';

export async function showModalMessageErrorDefault(
  error: unknown,
  showMessageModal: (options: ModalMessageOptions) => Promise<void>,
) {
  const message =
    error instanceof Error ? error.message : RESPONSE_MESSAGE.ERROR.SERVER;

  await showMessageModal({
    type: 'error',
    message,
    shouldBlockProcess: true,
  });
}
