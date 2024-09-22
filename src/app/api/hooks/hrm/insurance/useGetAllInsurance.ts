import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllInsurance = () => {
  return useQuery({
    queryKey: ['listInsurance'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceHRM.get('asuransi/');
      return data.data;
    },
  });
};
