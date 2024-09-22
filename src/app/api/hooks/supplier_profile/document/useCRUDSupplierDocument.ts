import { useMutation, useQuery } from '@tanstack/react-query';

import { SupplierDocumentProperty } from '@/helpers/utils/supplier_portal/supplier_document';
import AxiosService from '@/services/axiosService';

interface Update {
  pkid: number;
  data: SupplierDocumentProperty;
}

export const useCreateSupplierDocument = () => {
  return useMutation({
    mutationKey: ['createSupplierDocument'],
    mutationFn: async (data: SupplierDocumentProperty) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.post(
        '/supplier_profile/supplier_documents/',
        data,
      );
      return response.data;
    },
  });
};

export const useGetAllSupplierDocument = () => {
  return useQuery({
    queryKey: ['listSupplierDocument'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        'supplier_profile/supplier_documents/',
      );
      return data.data;
    },
  });
};

export const useGetSupplierDocumentByPkid = (pkid: number, enabled = true) => {
  return useQuery({
    queryKey: ['supplierDocument', pkid],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        `supplier_profile/supplier_documents/${pkid}/`,
      );
      return data.data;
    },
    enabled: enabled,
  });
}

export const useUpdateSupplierDocument = () => {
  return useMutation({
    mutationKey: ['updateSupplierDocument'],
    mutationFn: async ({ data, pkid }: Update) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.put(
        `/supplier_profile/supplier_documents/${pkid}/`,
        data,
      );
      return response.data;
    },
  });
};

export const useDeleteSupplierDocument = () => {
  return useMutation({
    mutationKey: ['deleteSupplierDocument'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.delete(
        `supplier_profile/supplier_documents/${pkid}/`,
      );
      return response.data;
    },
  });
}