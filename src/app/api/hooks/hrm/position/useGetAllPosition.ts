import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllPosition = () => {
  return useQuery({
    queryKey: ['listPosition'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceHRM.get('position/');
      return data.data;
    },
  });
};
