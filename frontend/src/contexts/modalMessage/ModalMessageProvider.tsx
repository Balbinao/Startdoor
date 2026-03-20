import { ModalMessage } from '@components/layout/ModalMessage/ModalMessage';
import { ModalMessageContext } from '@contexts/modalMessage/ModalMessageContext';
import type { ModalMessageOptions } from '@models/modal.types';
import { useState, type ReactNode } from 'react';

interface ModalMessageStateProps extends ModalMessageOptions {
  resolve?: () => void;
  reject?: () => void;
}

export const ModalMessageProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalMessageStateProps | null>(null);

  const showMessageModal = (options: ModalMessageOptions): Promise<void> => {
    return new Promise((resolve, reject) => {
      setModal({
        ...options,
        resolve,
        reject,
      });
    });
  };

  const handleClose = () => {
    if (!modal) return;

    if (modal.shouldBlockProcess) {
      modal.reject?.();
    } else {
      modal.resolve?.();
    }

    setModal(null);
  };

  return (
    <ModalMessageContext.Provider value={{ showMessageModal }}>
      {children}

      {modal && (
        <ModalMessage
          type={modal.type}
          message={modal.message}
          onClose={handleClose}
        />
      )}
    </ModalMessageContext.Provider>
  );
};
