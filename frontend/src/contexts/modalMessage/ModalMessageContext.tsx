import type { ModalMessageOptions } from '@models/modal.types';
import { createContext } from 'react';

interface Props {
  showMessageModal: (options: ModalMessageOptions) => Promise<void>;
}

export const ModalMessageContext = createContext<Props | null>(null);
