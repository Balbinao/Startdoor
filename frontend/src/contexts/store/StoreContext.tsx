import { RootStore, rootStore } from '@stores/RootStore';
import { createContext } from 'react';

export const StoreContext = createContext<RootStore>(rootStore);
