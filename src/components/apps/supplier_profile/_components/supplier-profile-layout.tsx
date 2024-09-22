'use client';

import SupplierRegisterNavigationButton from "@/components/apps/supplier_registration/_components/supplier-registration-navigation-buttons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RegisterSupplierFormLayoutProps = {
  children: React.ReactNode,
  // back: string,
  // next: string,
  // submit?: boolean
}

const SupplierProfileLayout = ({ children }: RegisterSupplierFormLayoutProps) => {
  const pathname = usePathname();
  const last_pathname = pathname.split('/')[pathname.split('/').length - 1];

  const activeOne = last_pathname === "general";
  const activeTwo = last_pathname === "financial";
  const activeThree = last_pathname === "certification";
  const activeFour = last_pathname === "experience";
  const activeFive = last_pathname === "document";
  
  return (
    <div className="mb-5">
      <div className="inline-block w-full">
        <div className="border-white-light mt-3 flex flex-wrap border-b dark:border-[#191e3a] mb-5"> 
          <div className="">
            <Link href='/supplier_profile/general'>
              <div className={
                `${
                  activeOne 
                    ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                  }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`
              }>
                Umum
              </div>
            </Link>
            
          </div>

          <div>
            <Link href='/supplier_profile/financial'>
              <div className={
                `${
                  activeTwo 
                    ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                  }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black]`
              }>
                Keuangan
              </div>
            </Link>
          </div>

          <div>
            <Link href='/supplier_profile/certification'>
              <div className={
                `${
                  activeThree 
                    ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black' 
                    : ''
                }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`
              }>
                Sertifikasi
              </div>
            </Link>
          </div>

          <div>
            <Link href='/supplier_profile/experience'>
              <div className={
                `${
                  activeFour 
                    ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`
              }>
                Pengalaman
              </div>
            </Link>
          </div>

          <div>
            <Link href='/supplier_profile/document'>
              <div className={
                `${
                  activeFive 
                    ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`
              }>
                Dokumen
              </div>
            </Link>
          </div>
        </div>

        <div>
          {children}
        </div>

        {/* <div className="panel mb-5">
          <SupplierRegisterNavigationButton back={back} next={next} submit={submit} />
        </div> */}
      </div>
    </div>
  );
};

export default SupplierProfileLayout;