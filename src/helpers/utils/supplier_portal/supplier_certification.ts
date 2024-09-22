export interface SupplierCertificationProperty {
  type_pkid: number | null;
  name: string | null;
  certificate_number: string | null;
  released_by: string | null; 
  released_date: Date | null;
  expiration_date: Date | null;
}

export const supplierCertificationInitialState: SupplierCertificationProperty = {
  type_pkid: null,
  name: null,
  certificate_number: null,
  released_by: null,
  released_date: null,
  expiration_date: null
}