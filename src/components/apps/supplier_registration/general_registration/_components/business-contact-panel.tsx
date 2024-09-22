'use client';

const BusinessContactPanel = () => {
  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Kontak Perusahaan</h2>
          <p className="text-gray-500 italic"><span style={{ color: 'red' }}>*</span> Menunjukkan pernyataan wajib diisi</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="business_address">
              Alamat
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="business_address"
              name="business_address"
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
            <label htmlFor="subdistrict">
              Kecamatan
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="subdistrict"
              name="subdistrict"
              type="text"
              placeholder="Kecamatan"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="city">
              Kabupaten/Kota
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Kabupaten/Kota"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="province">
              Provinsi
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="province"
              name="province"
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
            <label htmlFor="postal_code">
              Kode Pos
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="postal_code"
              name="postal_code"
              type="text"
              placeholder="Kode Pos"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="phone_number_1">
              No. Telepon 1
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="phone_number_1"
              name="phone_number_1"
              type="text"
              placeholder="No. Telepon 1"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="phone_number_2">
              No. Telepon 2
            </label>
            <input
              id="phone_number_2"
              name="phone_number_2"
              type="text"
              placeholder="No. Telepon 2"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="email">
              Email
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="website">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="Website"
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

export default BusinessContactPanel;