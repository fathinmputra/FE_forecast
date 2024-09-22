import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllPresenceWhite = () => {
  return useQuery({
    queryKey: ['listPresenceWhite'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceHRM.get(
        'recruitment_request/',
      );
      return data.data;
    },
  });
};
