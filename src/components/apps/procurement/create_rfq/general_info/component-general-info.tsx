'use client';

import FormLayout from '@/components/apps/procurement/create_rfq/_components/form-layout';
import NavigationButton from '@/components/apps/procurement/create_rfq/_components/navigation-buttons';
import ApproverForm from '@/components/apps/procurement/create_rfq/general_info/_components/approver-form';
import GeneralInfoForm from '@/components/apps/procurement/create_rfq/general_info/_components/general-info-form';

const ComponentsGeneralInfo = () => {
  return (
    <div className='space-y-5'>
      <FormLayout back='-' next='/procurement/create_rfq/material_detail'>
        <GeneralInfoForm />
        <ApproverForm />
      </FormLayout>
      
    </div>
  );
};

export default ComponentsGeneralInfo;
