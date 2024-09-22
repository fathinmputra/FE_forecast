export interface AssetMaintenanceProperty {
  title: string | null;
  start_date: Date | null;
  finish_date: Date | null;
  maintenance_type: string | null;
  maintenance_cost: number | null;
  description: string | null;
  asset_pkid: number | null;
}

export const assetMaintenanceInitialState: AssetMaintenanceProperty = {
  title: null,
  start_date: null,
  finish_date: null,
  maintenance_type: null,
  maintenance_cost: 0,
  description: null,
  asset_pkid: 0,
};
