import { ModalMessageContext } from '@contexts/modalMessage/ModalMessageContext';
import { useContext } from 'react';

export const useModalMessage = () => {
  const context = useContext(ModalMessageContext);

  if (!context) {
    throw new Error('useModalMessage must be used inside ModalMessageProvider');
  }

  return context;
};
