import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllAssetMaintenance = () => {
  return useQuery({
    queryKey: ['listAssetMaintenance'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceFixedAsset.get(
        'asset_maintenance/',
      );
      return data.data;
    },
  });
};
