'use client';

const SupplierInformationProfilePanel = () => {
  return (
    <div className='panel mb-5'>
      <div className='mb-5 flex flex-col gap-5 px-5'>
        <div className="flex flex-row justify-between">
          <h2 className='text-xl font-semibold'>Informasi Pemasok</h2>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {}}
          >
            Edit data
          </button>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <div className='text-white-dark space-y-1'>
            <h6>Badan Usaha :</h6>
            <h5 className='font-semibold text-black dark:text-white'>Perorangan</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Nama :</h6>
            <h5 className='font-semibold text-black dark:text-white'>Anugrah Jaya</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Tipe Pasokan :</h6>
            <div className="flex flex-row flex-wrap gap-2">
              <span className='badge bg-info rounded-full text-sm'>Pertanian</span>
              <span className='badge bg-info rounded-full text-sm'>Perkebunan</span>
              <span className='badge bg-info rounded-full text-sm'>Logam</span>
              <span className='badge bg-info rounded-full text-sm'>Kimia</span>
              <span className='badge bg-info rounded-full text-sm'>Teknologi</span>
              <span className='badge bg-info rounded-full text-sm'>Ritel</span>
              <span className='badge bg-info rounded-full text-sm'>Konstruksi</span>
              <span className='badge bg-info rounded-full text-sm'>Energi</span>
              <span className='badge bg-info rounded-full text-sm'>Industri</span>
              <span className='badge bg-info rounded-full text-sm'>Lainnya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInformationProfilePanel;
