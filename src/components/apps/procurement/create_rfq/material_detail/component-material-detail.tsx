import FormLayout from "@/components/apps/procurement/create_rfq/_components/form-layout";
import MaterialPanel from "@/components/apps/procurement/create_rfq/material_detail/_components/material-panel";

const ComponentsMaterialDetail = () => {
  return (
    <div className='space-y-5'>
      <FormLayout back='/procurement/create_rfq/general_info' next='/procurement/create_rfq/rfq_document'>
        <div className="panel mb-5 flex flex-col gap-0 px-5">
          <h2 className="text-xl font-semibold">Detail Material</h2>
          <p className="italic">(*) Biaya pengiriman merupakan total dari biaya jasa kendaraan / ekspedisi / logistik beserta biaya pengemudi</p>
        </div>
        <MaterialPanel title="Barang 1" />
        <div className="mb-5 flex flex-row justify-center">
          <button className="btn btn-success">Add Material</button>
        </div>
      </FormLayout>
    </div>
  );
};

export default ComponentsMaterialDetail;