import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllAsset = () => {
  return useQuery({
    queryKey: ['listAsset'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceFixedAsset.get('asset/');
      return data.data;
    },
  });
};
