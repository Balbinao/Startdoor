import { ModalLoadingProvider } from '@contexts/modalLoading/ModalLoadingProvider.tsx';
import { StoreProvider } from '@contexts/store/StoreProvider.tsx';
import '@styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalLoadingProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ModalLoadingProvider>
  </StrictMode>,
);
