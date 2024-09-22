const ApproverForm = () => {
  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <h2 className="text-xl font-semibold">Persetujuan</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <div>
            <label htmlFor="admin_name">
              Nama Admin <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="admin_name"
              name="admin_name"
              type="text"
              placeholder="Nama Admin"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproverForm;