import { ModalLoadingProvider } from '@contexts/modalLoading/ModalLoadingProvider.tsx';
import { ModalMessageProvider } from '@contexts/modalMessage/ModalMessageProvider.tsx';
import { StoreProvider } from '@contexts/store/StoreProvider.tsx';
import '@styles/global.css';
import '@styles/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalLoadingProvider>
      <ModalMessageProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ModalMessageProvider>
    </ModalLoadingProvider>
  </StrictMode>,
);
