const OpenContractPanel = () => {
  return (
    <div className='panel'>
      <div>
        <div className='text-xl font-bold'>Ringkasan Kontrak Terbuka</div>
      </div>
      <div className='relative mt-5'>
        <div className='flex justify-between items-center'>
          <div>
            <div className='text-primary'>Total Penawaran</div>
            <div className='mt-2 text-2xl font-semibold text-center'>0</div>
          </div>
          <div>
            <div className='text-primary'>Total Kontrak</div>
            <div className='mt-2 text-2xl font-semibold text-center'>0</div>
          </div>
          <div>
            <div className='text-primary'>Kontrak Item Aktif</div>
            <div className='mt-2 text-2xl font-semibold text-center'>0</div>
          </div>
          <div>
            <div className='text-primary'>Kontrak Item Masa Tunggu</div>
            <div className='mt-2 text-2xl font-semibold text-center'>0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenContractPanel;
