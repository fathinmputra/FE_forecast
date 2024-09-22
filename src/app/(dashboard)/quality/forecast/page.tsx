import { Metadata } from 'next';
import React from 'react';

import ComponentsForecast from '@/components/apps/quality/forecast/component-forecast';

export const metadata: Metadata = {
  title: 'Forecast',
};

const ForecastPage = () => {
  return <ComponentsForecast />;
};

export default ForecastPage;
