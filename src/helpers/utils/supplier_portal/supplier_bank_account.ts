export interface SupplierBankAccountProperty {
  account_number: string | null;
  owner: string | null;
  bank_name: string | null;
  branch_name: string | null;
  address: string | null;
}

export const supplierBankAccountInitialState: SupplierBankAccountProperty = {
  account_number: null,
  owner: null,
  bank_name: null,
  branch_name: null,
  address: null
}