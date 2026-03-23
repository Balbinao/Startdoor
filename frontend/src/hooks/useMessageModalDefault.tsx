import { RESPONSE_MESSAGE } from '@constants';
import { useModalMessage } from '@contexts/modalMessage/useModalMessage';
import type { ModalMessageOptions } from '@models/modal.types';

export const useModalMessageDefault = () => {
  const { showMessageModal } = useModalMessage();

  const modalMessageSafe = async (
    options: ModalMessageOptions,
  ): Promise<boolean> => {
    try {
      await showMessageModal(options);
      return true;
    } catch {
      return false;
    }
  };

  const modalMessageError = async (error: unknown) => {
    const message =
      error instanceof Error ? error.message : RESPONSE_MESSAGE.ERROR.SERVER;

    await showMessageModal({
      type: 'error',
      message,
      shouldBlockProcess: true,
    });
  };

  return { modalMessageSafe, modalMessageError };
};
