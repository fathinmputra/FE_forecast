'use client';

import SupplierRegisterNavigationButton from "@/components/apps/supplier_registration/_components/supplier-registration-navigation-buttons";
import { usePathname } from "next/navigation";

type RegisterSupplierFormLayoutProps = {
  children: React.ReactNode,
  back: string,
  next: string,
  submit?: boolean
}

const SupplierRegisterFormLayout = ({ children, back, next, submit=false }: RegisterSupplierFormLayoutProps) => {
  const pathname = usePathname();
  const last_pathname = pathname.split('/')[pathname.split('/').length - 1];

  const activeOne = last_pathname === "general_registration";
  const activeTwo = last_pathname === "financial_registration";
  const activeThree = last_pathname === "certification_registration";
  const activeFour = last_pathname === "experience_registration";
  const activeFive = last_pathname === "document_registration";
  
  return (
    <div className="mb-5">
      <div className="inline-block w-full">
        <ul className="mb-5 grid grid-cols-5 gap-3 text-center">
          <li>
            <div className={`${activeOne ? '!bg-primary text-white' : ''} block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>
              Umum
            </div>
          </li>

          <li>
            <div className={`${activeTwo ? '!bg-primary text-white' : ''} block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>
              Keuangan
            </div>
          </li>

          <li>
            <div className={`${activeThree ? '!bg-primary text-white' : ''} block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>
              Sertifikasi
            </div>
          </li>

          <li>
            <div className={`${activeFour ? '!bg-primary text-white' : ''} block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>
              Pengalaman
            </div>
          </li>

          <li>
            <div className={`${activeFive ? '!bg-primary text-white' : ''} block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>
              Dokumen
            </div>
          </li>
        </ul>

        <div>
          {children}
        </div>

        <div className="panel mb-5">
          <SupplierRegisterNavigationButton back={back} next={next} submit={submit} />
        </div>
      </div>
    </div>
  );
};

export default SupplierRegisterFormLayout;