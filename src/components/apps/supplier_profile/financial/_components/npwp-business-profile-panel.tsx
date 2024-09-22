'use client';

const NPWPBusinessProfilePanel = () => {
  return (
    <div className='panel mb-5'>
      <div className='mb-5 flex flex-col gap-5 px-5'>
        <div className="flex flex-row justify-between">
          <h2 className='text-xl font-semibold'>NPWP Perusahaan</h2>
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
            <h6>Nomor :</h6>
            <h5 className='font-semibold text-black dark:text-white'>12312313123123</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Alamat (sesuai NPWP) :</h6>
            <h5 className='font-semibold text-black dark:text-white'>Jalan Pelita IV No. 1</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Kabupaten/Kota :</h6>
            <h5 className='font-semibold text-black dark:text-white'>Surabaya</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Provinsi :</h6>
            <h5 className='font-semibold text-black dark:text-white'>Jawa Timur</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Kode Pos :</h6>
            <h5 className='font-semibold text-black dark:text-white'>20236</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NPWPBusinessProfilePanel;