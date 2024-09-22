import { useMutation } from '@tanstack/react-query';

import { AssetProperty } from '@/helpers/utils/fixed_asset/asset_registration';
import AxiosService from '@/services/axiosService';

export const useCreateAsset = () => {
  return useMutation({
    mutationKey: ['createAsset'],
    mutationFn: async (data: AssetProperty) => {
      const response = await AxiosService.AxiosServiceFixedAsset.post(
        'asset/',
        data,
      );
      return response.data;
    },
  });
};
