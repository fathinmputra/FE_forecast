export interface SupplierExperienceProperty {
  client_name: string | null;
  project_name: string | null;
  contract_number: string | null;
  start_date: Date | null;
  end_date: Date | null;
  description: string | null;
}

export const supplierExperienceInitialState: SupplierExperienceProperty = {
  client_name: null,
  project_name: null,
  contract_number: null,
  start_date: null,
  end_date: null,
  description: null
}