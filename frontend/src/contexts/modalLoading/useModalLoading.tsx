import { useContext } from 'react';
import { ModalLoadingContext } from './ModalLoadingContext';

export const useModalLoading = () => {
  const context = useContext(ModalLoadingContext);
  if (!context) {
    throw new Error('useModalLoading must be used inside ModalLoadingProvider');
  }
  return context;
};
