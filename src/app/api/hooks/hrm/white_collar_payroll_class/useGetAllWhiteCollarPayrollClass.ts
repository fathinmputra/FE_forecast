import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllWhiteCollarPayrollClass = () => {
  return useQuery({
    queryKey: ['listWhiteCollarPayrollClass'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceHRM.get('white_payroll/');
      return data.data;
    },
  });
};
