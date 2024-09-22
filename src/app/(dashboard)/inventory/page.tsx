import { Metadata } from 'next';
import React from 'react';

import ComponentsInventoryMenu from '@/components/apps/inventory/inventory_menu/component-inventory-menu';

export const metadata: Metadata = {
  title: 'Inventory Menu',
};

const InventoryMenuPage = () => {
  return <ComponentsInventoryMenu />;
};

export default InventoryMenuPage;
