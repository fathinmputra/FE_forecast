import SupplierRegisterFormLayout from "@/components/apps/supplier_registration/_components/supplier-registration-form-layout";
import CertificationPanel from "@/components/apps/supplier_registration/certification_registration/_components/certification_panel";

const ComponentsSertificationRegistration = () => {
  return (
    <div className="space-y-5">
      <SupplierRegisterFormLayout back="/financial_registration" next="/experience_registration">
        <CertificationPanel />
      </SupplierRegisterFormLayout>
    </div>
  );
};

export default ComponentsSertificationRegistration;