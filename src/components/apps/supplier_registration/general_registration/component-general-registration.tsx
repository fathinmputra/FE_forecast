import SupplierRegisterFormLayout from "@/components/apps/supplier_registration/_components/supplier-registration-form-layout";
import BankAccountPanel from "@/components/apps/supplier_registration/general_registration/_components/bank-account-panel";
import BusinessContactPanel from "@/components/apps/supplier_registration/general_registration/_components/business-contact-panel";
import SupplierInformatoinPanel from "@/components/apps/supplier_registration/general_registration/_components/supplier-information-panel";

const ComponentsGeneralRegistration = () => {
  return (
    <div className="space-y-5">
      <SupplierRegisterFormLayout back="-" next="/financial_registration">
        <SupplierInformatoinPanel />
        <BusinessContactPanel />
        <BankAccountPanel />
      </SupplierRegisterFormLayout>
    </div>
  );
};

export default ComponentsGeneralRegistration;