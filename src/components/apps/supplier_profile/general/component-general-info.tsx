import SupplierProfileLayout from "@/components/apps/supplier_profile/_components/supplier-profile-layout"
import BankAccountProfilePanel from "@/components/apps/supplier_profile/general/_components/bank-account-profile-panel";
import BusinessContactProfilePanel from "@/components/apps/supplier_profile/general/_components/business-contact-profile-panel";
import SupplierInformationProfilePanel from "@/components/apps/supplier_profile/general/_components/supplier-information-profile-panel"

const ComponentsGeneralProfile = () => {
  return (
    <div className="space-y-5">
      <SupplierProfileLayout>
        <SupplierInformationProfilePanel />
        <BusinessContactProfilePanel />
        <BankAccountProfilePanel />
      </SupplierProfileLayout>
    </div>
  )
}

export default ComponentsGeneralProfile;