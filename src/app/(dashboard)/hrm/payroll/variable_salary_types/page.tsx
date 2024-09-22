import { Metadata } from 'next';
import React from 'react';

import ComponentVariableSalaryTypes from '@/components/apps/hrm/payroll/variable_salary_types/component-variable-salary-types';

export const metadata: Metadata = {
  title: 'Variable Salary Types',
};

const VariableSalaryTypesPage = () => {
  return <ComponentVariableSalaryTypes />;
};

export default VariableSalaryTypesPage;
