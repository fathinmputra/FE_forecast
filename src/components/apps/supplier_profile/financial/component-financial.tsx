import SupplierProfileLayout from "@/components/apps/supplier_profile/_components/supplier-profile-layout";
import NPWPBusinessProfilePanel from "@/components/apps/supplier_profile/financial/_components/npwp-business-profile-panel";
import PastFinancialInformationProfilePanel from "@/components/apps/supplier_profile/financial/_components/past-financial-information-profile-panel";

const ComponentsFinancialProfile = () => {
  return (
    <div className="space-y-5">
      <SupplierProfileLayout>
        <NPWPBusinessProfilePanel />
        <PastFinancialInformationProfilePanel />
      </SupplierProfileLayout>
    </div>
  );
}

export default ComponentsFinancialProfile;