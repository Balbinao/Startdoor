import { createContext } from 'react';

interface Props {
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

export const ModalLoadingContext = createContext<Props | null>(null);
