import { useQuery } from '@tanstack/react-query';

import AxiosService from '@/services/axiosService';

export const useGetAllSupplierDocumentType = () => {
  return useQuery({
    queryKey: ['listSupplierDocumentType'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        'supplier_profile/document_type/',
      );
      return data.data;
    },
  })
}