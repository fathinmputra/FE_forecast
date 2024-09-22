import { useMutation } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useDeleteAssetMaintenance = () => {
  return useMutation({
    mutationKey: ['deleteAssetMaintenance'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceFixedAsset.delete(
        `asset_maintenance/${pkid}`,
      );
      return response.data;
    },
  });
};
