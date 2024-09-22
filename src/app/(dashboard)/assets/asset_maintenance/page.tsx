import { Metadata } from 'next';
import React from 'react';

import ComponentsAssetMaintenance from '@/components/apps/asset/asset_maintenance/component-asset-maintenance';

export const metadata: Metadata = {
  title: 'Asset Maintenance',
};

const AssetMaintenancePage = () => {
  return <ComponentsAssetMaintenance />;
};

export default AssetMaintenancePage;
