import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllVariableSalaryTypes = () => {
  return useQuery({
    queryKey: ['listVariableSalaryTypes'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceHRM.get(
        'allowance_name/',
      );
      return data.data;
    },
  });
};
