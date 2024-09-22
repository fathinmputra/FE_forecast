import { useMutation } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useDeleteAsset = () => {
  return useMutation({
    mutationKey: ['deleteAsset'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceFixedAsset.delete(
        `asset/${pkid}`,
      );
      return response.data;
    },
  });
};
