import { useMutation, useQuery } from '@tanstack/react-query';

import { SupplierExperienceProperty } from '@/helpers/utils/supplier_portal/supplier_experience';
import AxiosService from '@/services/axiosService';

interface Update {
  pkid: number;
  data: SupplierExperienceProperty;
}

export const useCreateSupplierExperience = () => {
  return useMutation({
    mutationKey: ['createExperience'],
    mutationFn: async (data: SupplierExperienceProperty) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.post(
        'supplier_profile/experience/',
        data,
      );
      return response.data;
    },
  });
}

export const useGetAllSupplierExperience = () => {
  return useQuery<SupplierExperienceProperty[]>({
    queryKey: ['listExperience'],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        'supplier_profile/experience/',
      );
      return data.data;
    },
  });
}

export const useGetSupplierExperienceByPkid = (pkid: number, enabled = true) => {
  return useQuery<SupplierExperienceProperty>({
    queryKey: ['getExperienceByPkid', pkid],
    queryFn: async () => {
      const { data } = await AxiosService.AxiosServiceSupplierPortal.get(
        `supplier_profile/experience/${pkid}`,
      );
      return data.data;
    },
    enabled: enabled,
  });
}

export const useUpdateSupplierExperience = () => {
  return useMutation({
    mutationKey: ['updateExperienceByPkid'],
    mutationFn: async ({ data, pkid }: Update) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.put(
        `supplier_profile/experience/${pkid}`,
        data,
      );
      return response.data;
    }
  });
}

export const useDeleteSupplierExperience = () => {
  return useMutation({
    mutationKey: ['deleteExperienceByPkid'],
    mutationFn: async (pkid: number) => {
      const response = await AxiosService.AxiosServiceSupplierPortal.delete(
        `supplier_profile/experience/${pkid}`,
      );
      return response.data;
    }
  });
}