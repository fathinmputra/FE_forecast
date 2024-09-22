import SupplierRegisterFormLayout from "@/components/apps/supplier_registration/_components/supplier-registration-form-layout";
import ExperiencePanel from "@/components/apps/supplier_registration/experience_registration/_components/experience-panel";

const ComponentsExperienceRegistration = () => {
  return (
    <div className="space-y-5">
      <SupplierRegisterFormLayout back="/certification_registration" next="/document_registration">
        <ExperiencePanel />
      </SupplierRegisterFormLayout>
    </div>
  );
};

export default ComponentsExperienceRegistration;