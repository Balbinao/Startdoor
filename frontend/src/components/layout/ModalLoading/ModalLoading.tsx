import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  message?: string;
}

export const ModalLoading = ({ message }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex min-h-56 max-w-sm min-w-2xs flex-col items-center justify-center gap-5 rounded-3xl bg-(--grey-1000) p-6 px-12">
        <div className="h-12 w-12 animate-spin rounded-full border-5 border-(--grey-700) border-t-(--purple-300)" />
        {message && (
          <p className="animate-pulse text-center leading-6 text-(--grey-300)">
            {message}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
};
