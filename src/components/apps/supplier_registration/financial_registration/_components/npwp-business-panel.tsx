'use client';

const NPWPBusinessPanel = () => {
  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <h2 className="text-xl font-semibold">NPWP</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="npwp_number">
              Nomor
            </label>
            <input
              id="npwp_number"
              name="npwp_number"
              type="text"
              placeholder="Nomor"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="npwp_address">
              Alamat (sesuai NPWP)
            </label>
            <input
              id="npwp_address"
              name="npwp_address"
              type="text"
              placeholder="Alamat"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="npwp_city">
              Kota
            </label>
            <input
              id="npwp_city"
              name="npwp_city"
              type="text"
              placeholder="Kota"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="npwp_province">
              Provinsi
            </label>
            <input
              id="npwp_province"
              name="npwp_province"
              type="text"
              placeholder="Provinsi"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="npwp_postal_code">
              Kode Pos
            </label>
            <input
              id="npwp_postal_code"
              name="npwp_postal_code"
              type="text"
              placeholder="Kode Pos"
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
};

export default NPWPBusinessPanel;