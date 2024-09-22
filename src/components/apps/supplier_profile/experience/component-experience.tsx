import SupplierProfileLayout from "@/components/apps/supplier_profile/_components/supplier-profile-layout";
import SupplierExperienceProfilePanel from "@/components/apps/supplier_profile/experience/_components/experience-profile-panel";

const ComponentsExperienceProfile = () => {
  return (
    <div className="space-y-5">
      <SupplierProfileLayout>
        <SupplierExperienceProfilePanel />
      </SupplierProfileLayout>
    </div>
  );
}

export default ComponentsExperienceProfile;