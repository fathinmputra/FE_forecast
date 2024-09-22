import { useMutation } from '@tanstack/react-query';

import { AssetMaintenanceProperty } from '@/helpers/utils/fixed_asset/asset_maintenance';
import AxiosService from '@/services/axiosService';
interface Update {
  pkid: number;
  data: AssetMaintenanceProperty;
}
export const useUpdateAssetMaintenance = () => {
  return useMutation({
    mutationKey: ['updateAssetMaintenanceByPkid'],
    mutationFn: async ({ pkid, data }: Update) => {
      const response = await AxiosService.AxiosServiceFixedAsset.put(
        `asset_maintenance/${pkid}`,
        data,
      );
      return response.data;
    },
  });
};
