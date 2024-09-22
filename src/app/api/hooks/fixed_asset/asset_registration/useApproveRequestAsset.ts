import { useMutation } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useApproveRequestAsset = () => {
  return useMutation({
    mutationKey: ['approveRequestAsset'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceFixedAsset.put(
        `asset/approve/${pkid}`,
      );
      return response.data;
    },
  });
};
