import SupplierProfileLayout from "@/components/apps/supplier_profile/_components/supplier-profile-layout";
import CertificationProfilePanel from "@/components/apps/supplier_profile/certification/_components/certification-profile-panel";

const ComponentsCertificationProfile = () => {
  return (
    <div className="space-y-5">
      <SupplierProfileLayout>
        <CertificationProfilePanel />
      </SupplierProfileLayout>
    </div>
  )
}

export default ComponentsCertificationProfile;