'use client';

const PastFinancialInformationProfilePanel = () => {
  return (
    <div className='panel mb-5'>
      <div className='mb-5 flex flex-col gap-5 px-5'>
        <div className="flex flex-row justify-between">
          <h2 className='text-xl font-semibold'>Informasi Keuangan Terdahulu</h2>
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
            <h6>Tahun :</h6>
            <h5 className='font-semibold text-black dark:text-white'>2021</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Jenis :</h6>
            <h5 className='font-semibold text-black dark:text-white'>AUDIT</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Nilai aset :</h6>
            <h5 className='font-semibold text-black dark:text-white'>10.000.000</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Hutang :</h6>
            <h5 className='font-semibold text-black dark:text-white'>1.000.000</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Pendapatan kotor :</h6>
            <h5 className='font-semibold text-black dark:text-white'>5.000.000</h5>
          </div>
          <div className='text-white-dark space-y-1'>
            <h6>Pendapatan bersih :</h6>
            <h5 className='font-semibold text-black dark:text-white'>4.000.000</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastFinancialInformationProfilePanel