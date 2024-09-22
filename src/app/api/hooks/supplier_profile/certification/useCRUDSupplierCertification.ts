import { useMutation, useQuery } from '@tanstack/react-query';

import { SupplierCertificationProperty } from '@/helpers/utils/supplier_portal/supplier_certification';
import AxiosService from '@/services/axiosService';

interface Update {
  pkid: number;
  data: SupplierCertificationProperty;
}

export const useCreateSupplierCertification = () => {
  return useMutation({
    mutationKey: ['createCertification'],
    mutationFn: async (data: SupplierCertificationProperty) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.post(
        'supplier_profile/certification/',
        data,
      );
      return response.data;
    },
  });
}

export const useGetAllSupplierCertification = () => {
  return useQuery<SupplierCertificationProperty[]>({
    queryKey: ['listCertification'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        'supplier_profile/certification/',
      );
      return data.data;
    },
  });
}

export const useGetSupplierCertificationByPkid = (pkid: number, enabled = true) => {
  return useQuery<SupplierCertificationProperty>({
    queryKey: ['getCertificationByPkid', pkid],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        `supplier_profile/certification/${pkid}`,
      );
      return data.data;
    },
    enabled: enabled,
  });
}

export const useUpdateSupplierCertification = () => {
  return useMutation({
    mutationKey: ['updateCertificationByPkid'],
    mutationFn: async ({ data, pkid }: Update) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.put(
        `supplier_profile/certification/${pkid}`,
        data,
      );
      return response.data;
    }
  });
}

export const useDeleteSupplierCertification = () => {
  return useMutation({
    mutationKey: ['deleteCertificationByPkid'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.delete(
        `supplier_profile/certification/${pkid}`,
      );
      return response.data;
    }
  });
}

