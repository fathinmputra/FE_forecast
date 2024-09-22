import Link from 'next/link';

type RegisterNavigationButton = {
  back: string
  next: string
  submit?: boolean
}

const SupplierRegisterNavigationButton = ({ back, next, submit = false }: RegisterNavigationButton) => {
  return (
    <div className='flex justify-between'>
      <Link href={back}>
        <p className={`btn btn-primary ltr:ml-auto rtl:mr-auto ${back === '-' ? 'hidden' : ''}`}>
          {/* Peritimbangkan apakah tombol back di awal akan dihilangkan atau diganti jadi tombol logout */}
          Back
        </p>
      </Link>

      <div className='flex gap-4'>
        <button className='btn btn-primary ltr:ml-auto rtl:mr-auto'>
          Save
        </button>

        <Link href={next}>
          <p className='btn btn-primary ltr:ml-auto rtl:mr-auto'>
            {submit ? "Submit" : "Next"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SupplierRegisterNavigationButton;