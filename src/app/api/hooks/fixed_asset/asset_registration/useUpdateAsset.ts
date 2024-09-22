import { useMutation } from '@tanstack/react-query';

import { AssetProperty } from '@/helpers/utils/fixed_asset/asset_registration';
import AxiosService from '@/services/axiosService';
interface Update {
  pkid: number;
  data: AssetProperty;
}
export const useUpdateAsset = () => {
  return useMutation({
    mutationKey: ['updateAssetByPkid'],
    mutationFn: async ({ pkid, data }: Update) => {
      const response = await AxiosService.AxiosServiceFixedAsset.put(
        `asset/${pkid}`,
        data,
      );
      return response.data;
    },
  });
};
