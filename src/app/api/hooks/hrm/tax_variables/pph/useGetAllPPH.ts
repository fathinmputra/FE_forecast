import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllPPH = () => {
  return useQuery({
    queryKey: ['listPPH'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceHRM.get('ter_pph/');
      return data.data;
    },
  });
};
