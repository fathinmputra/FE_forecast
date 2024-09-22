import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllEmployee = () => {
  return useQuery({
    queryKey: ['listEmployee'],
    queryFn: async () => {
      const response = await AxiosService.AxiosServiceHRM.get('employee/');
      return {
        data: response.data.data,
        headers: response.headers,
      };
    },
  });
};
