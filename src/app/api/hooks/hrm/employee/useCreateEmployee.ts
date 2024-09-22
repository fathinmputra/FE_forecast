import { useMutation } from '@tanstack/react-query';

import { EmployeeProperty } from '@/helpers/utils/hrm/employee';
import AxiosService from '@/services/axiosService';

export const useCreateEmployee = () => {
  return useMutation({
    mutationKey: ['createEmployee'],
    mutationFn: async (data: EmployeeProperty) => {
      try {
        const response = await AxiosService.AxiosServiceHRM.post(
          'employee/',
          data,
        );
        return response.data;
      } catch (error) {
        // Console log error
        throw new Error('Error creating employee: ');
      }
    },
  });
};
