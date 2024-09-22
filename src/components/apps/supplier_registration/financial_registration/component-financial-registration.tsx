import SupplierRegisterFormLayout from "@/components/apps/supplier_registration/_components/supplier-registration-form-layout";
import NPWPBusinessPanel from "@/components/apps/supplier_registration/financial_registration/_components/npwp-business-panel";
import PastFinancialInformationPanel from "@/components/apps/supplier_registration/financial_registration/_components/past-financial-information-panel";

const ComponentsFinancialRegistration = () => {
  return (
    <div className="space-y-5">
      <SupplierRegisterFormLayout back="/general_registration" next="/certification_registration">
        <NPWPBusinessPanel />
        <PastFinancialInformationPanel />
      </SupplierRegisterFormLayout>
    </div>
  );
};

export default ComponentsFinancialRegistration;