import SupplierProfileLayout from "@/components/apps/supplier_profile/_components/supplier-profile-layout"
import DocumentProfilePanel from "@/components/apps/supplier_profile/document/_components/document-profile-panel"

const ComponentsDocumentProfile = () => {
  return (
    <div className="space-y-5">
      <SupplierProfileLayout>
        <DocumentProfilePanel />
      </SupplierProfileLayout>
    </div>
  )
}

export default ComponentsDocumentProfile