import { useMutation, useQuery } from '@tanstack/react-query';

import { SupplierProperty } from '@/helpers/utils/purchasing/supplier';
import AxiosService from '@/services/axiosService';

export const useGetAllSupplier = () => {
  return useQuery({
    queryKey: ['listSuppliers'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServicePurchasing.get(
        'suppliers/',
      );
      return data as SupplierProperty[];
    },
  });
};

export const useCreateSupplier = () => {
  return useMutation({
    mutationKey: ['createSupplier'],
    mutationFn: async (data: SupplierProperty) => {
      const response = await AxiosService.AxiosServicePurchasing.post(
        'suppliers/',
        data,
      );
      return response.data;
    },
  });
};
