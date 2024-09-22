import { useMutation } from '@tanstack/react-query';

import { AssetMaintenanceProperty } from '@/helpers/utils/fixed_asset/asset_maintenance';
import AxiosService from '@/services/axiosService';

export const useCreateAssetMaintenance = () => {
  return useMutation({
    mutationKey: ['createAssetMaintenance'],
    mutationFn: async (data: AssetMaintenanceProperty) => {
      const response = await AxiosService.AxiosServiceFixedAsset.post(
        'asset_maintenance/',
        data,
      );
      return response.data;
    },
  });
};
