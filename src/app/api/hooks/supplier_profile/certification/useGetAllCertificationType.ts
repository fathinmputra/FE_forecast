import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllCertificationType = () => {
  return useQuery({
    queryKey: ['listCertificationType'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        'supplier_profile/certification_type/',
      );
      return data.data;
    },
  })
}