import { useMutation, useQuery } from '@tanstack/react-query';

import { SupplierBankAccountProperty } from '@/helpers/utils/supplier_portal/supplier_bank_account';
import AxiosService from '@/services/axiosService';

interface Update {
  pkid: number;
  data: SupplierBankAccountProperty;
}

export const useCreateSupplierBankAccount = () => {
  return useMutation({
    mutationKey: ['createBankAccount'],
    mutationFn: async (data: SupplierBankAccountProperty) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.post(
        'supplier_profile/bankAccount',
        data,
      );
      return response.data;
    },
  });
}

export const useGetAllSupplierBankAccount = () => {
  return useQuery<SupplierBankAccountProperty[]>({
    queryKey: ['listBankAccount'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        'supplier_profile/bankAccount/',
      );
      return data.data;
    },
  });
}

export const useGetSupplierBankAccountByPkid = (pkid: number, enabled = true) => {
  return useQuery<SupplierBankAccountProperty>({
    queryKey: ['getBankAccountByPkid', pkid],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        `supplier_profile/bankAccount/${pkid}`,
      );
      return data.data;
    },
    enabled: enabled,
  });
}

export const useUpdateSupplierBankAccount = () => {
  return useMutation({
    mutationKey: ['updateBankAccountByPkid'],
    mutationFn: async ({ data, pkid }: Update) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.put(
        `supplier_profile/bankAccount/${pkid}`,
        data,
      );
      return response.data;
    }
  });
}

export const useDeleteSupplierBankAccount = () => {
  return useMutation({
    mutationKey: ['deleteBankAccountByPkid'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.delete(
        `supplier_profile/bankAccount/${pkid}`,
      );
      return response.data;
    }
  });
}