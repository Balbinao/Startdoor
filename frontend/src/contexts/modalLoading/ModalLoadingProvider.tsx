import { ModalLoading } from '@components/layout/ModalLoading/ModalLoading';
import { useState, type ReactNode } from 'react';
import { ModalLoadingContext } from './ModalLoadingContext';

export const ModalLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [message, setMessage] = useState<string | undefined>();

  const startLoading = (msg?: string) => {
    if (msg) setMessage(msg);
    setLoadingCount(prev => prev + 1);
  };

  const stopLoading = () => {
    setLoadingCount(prev => Math.max(prev - 1, 0));
  };

  const isLoading = loadingCount > 0;

  return (
    <ModalLoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}
      {isLoading && <ModalLoading message={message} />}
    </ModalLoadingContext.Provider>
  );
};
