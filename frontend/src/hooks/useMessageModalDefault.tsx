import type { IAxiosCustomResponse } from '@config';
import { useModalMessage } from '@contexts/modalMessage/useModalMessage';
import type { ModalMessageOptions } from '@models/modal.types';
import { useAuth } from './useAuth';

export const useModalMessageDefault = () => {
  const { showMessageModal } = useModalMessage();
  const { logout } = useAuth();

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
    const err = error as IAxiosCustomResponse;
    const message = err.message;
    const status = err.status;

    await showMessageModal({
      type: 'error',
      message,
      shouldBlockProcess: true,
      onClose: () => {
        if (status === 403) {
          logout();
        }
      },
    });
  };

  return { modalMessageSafe, modalMessageError };
};
