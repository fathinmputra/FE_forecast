import { useMutation } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useApproveRequestAssetMaintenance = () => {
  return useMutation({
    mutationKey: ['approveRequestAssetMaintenance'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceFixedAsset.put(
        `asset_maintenance/approve/${pkid}`,
      );
      return response.data;
    },
  });
};
