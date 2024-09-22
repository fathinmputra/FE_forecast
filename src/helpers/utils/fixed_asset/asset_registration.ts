export interface AssetProperty {
  name: string | null;
  type_of_asset: string | null;
  price: number | null;
  purchase_date: Date | null;
  quantity: number | null;
  total_price: number | null;
  residual_value: number | null;
  address: string | null;
  department: string | null;
  description: string | null;
  monthly_depreciation_tax?: number | null;
  actual_hours_per_day: number | null;
  actual_days_per_week: number | null;
  is_machine?: boolean | null;
  status?: string | null;
  supplier: string | null;
  start_depreciation_date: Date | null;
  account_of_asset: string | null;
  account_modal_asset: string | null;
  account_depreciation_expense_asset: string | null;
  account_accumulated_depreciation_asset: string | null;
  category_pkid: number | null;
  fiscal_type_pkid: number | null;
  group_pkid: number | null;
  number_group_pkid: number | null;
  pkid?: number | null;
  book_value?: number | null;
}

export const assetRegistrationInitialState: AssetProperty = {
  name: null,
  type_of_asset: null,
  price: null,
  purchase_date: null,
  quantity: null,
  total_price: 0,
  residual_value: null,
  address: null,
  actual_hours_per_day: 0,
  actual_days_per_week: 0,
  supplier: null,
  is_machine: false,
  start_depreciation_date: null,
  account_of_asset: null,
  account_modal_asset: null,
  account_depreciation_expense_asset: null,
  account_accumulated_depreciation_asset: null,
  category_pkid: null,
  fiscal_type_pkid: null,
  group_pkid: null,
  number_group_pkid: null,
  description: null,
  department: null,
};
