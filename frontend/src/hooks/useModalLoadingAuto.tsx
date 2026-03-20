import { useModalLoading } from '@contexts/modalLoading/useModalLoading';

type Props = <T>(fn: () => Promise<T>, message?: string) => Promise<T>;

export const useModalLoadingAuto = (): Props => {
  const { startLoading, stopLoading } = useModalLoading();

  const modalLoadingAuto: Props = async (fn, message) => {
    startLoading(message);
    try {
      return await fn();
      // return new Promise<T>(() => {});
    } finally {
      stopLoading();
    }
  };

  return modalLoadingAuto;
};
