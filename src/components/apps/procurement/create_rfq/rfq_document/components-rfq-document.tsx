import FormLayout from "@/components/apps/procurement/create_rfq/_components/form-layout";
import AdditionalRequirementPanel from "@/components/apps/procurement/create_rfq/rfq_document/_components/additional-requirement-panel";
import UploadDetailActivityPanel from "@/components/apps/procurement/create_rfq/rfq_document/_components/upload-detail-activity-panel";

const ComponentsRFQDocument = () => {
  return (
    <div className='space-y-5'>
      <FormLayout back='/procurement/create_rfq/material_detail' next='/procurement/open' home={true}>
        <UploadDetailActivityPanel />
        <AdditionalRequirementPanel />
      </FormLayout>
    </div>
  );
};

export default ComponentsRFQDocument;