import { useStore } from '@contexts/store/useStore';
import type { IInputOption } from '@models/input.types';
import { sectorService } from '@services/sectorService';
import { useCallback } from 'react';

export const useSector = () => {
  const { sectorStore } = useStore();

  const sectorsOptions = sectorStore.sectorsOptions;

  const getSectors = useCallback(async () => {
    try {
      const response = await sectorService.getSectors();
      const formatted: IInputOption[] = [
        { label: 'Selecione...', value: '' },
        ...response.map(item => ({
          label: item.nome,
          value: item.id,
        })),
      ];

      sectorStore.setSectorsOptions(formatted);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [sectorStore]);

  return {
    sectorsOptions,
    getSectors,
  };
};
