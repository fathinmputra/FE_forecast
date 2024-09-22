import { Metadata } from 'next';
import React from 'react';

import ComponentsInventoryStorages from '@/components/apps/inventory/inventory_storages/component-inventory-storages';

export const metadata: Metadata = {
  title: 'Inventory Storages',
};

const InventoryStoragesPage = () => {
  return <ComponentsInventoryStorages />;
};

export default InventoryStoragesPage;
