import { ModalLoadingContext } from '@contexts/modalLoading/ModalLoadingContext';
import { useContext } from 'react';

export const useModalLoading = () => {
  const context = useContext(ModalLoadingContext);
  if (!context) {
    throw new Error('useModalLoading must be used inside ModalLoadingProvider');
  }
  return context;
};
