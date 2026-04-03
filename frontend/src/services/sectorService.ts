import { api } from '@config';
import { API_CONST } from '@constants';
import type { ISector } from '@models/sector.types';

export const sectorService = {
  getSectors: async (): Promise<ISector[]> => {
    const response = await api.get(API_CONST.SECTOR.BASE);
    return response.data;
  },
};
