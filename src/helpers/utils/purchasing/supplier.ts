export interface SupplierProperty {
  pkid: number | null;
  name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  createdAt: string | null;
}

export const supplierInitialState: SupplierProperty = {
  pkid: null,
  name: null,
  address: null,
  phone: null,
  email: null,
  createdAt: null,
};
