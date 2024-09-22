import SupplierRegisterFormLayout from "@/components/apps/supplier_registration/_components/supplier-registration-form-layout";
import DocumentPanel from "@/components/apps/supplier_registration/document_registration/_components/document-panel";

const ComponentsDocumentRegistration = () => {
  return (
    <div className="space-y-5">
      <SupplierRegisterFormLayout back="/financial_registration" next="/experience_registration">
        <DocumentPanel />
      </SupplierRegisterFormLayout>
    </div>
  );
};

export default ComponentsDocumentRegistration;