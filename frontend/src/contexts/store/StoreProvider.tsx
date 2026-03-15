import { rootStore } from '@stores/RootStore';
import { type ReactNode } from 'react';
import { StoreContext } from './StoreContext';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
