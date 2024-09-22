'use client';

import { usePathname } from "next/navigation";
import { useState } from "react";

import NavigationButton from "@/components/apps/procurement/create_rfq/_components/navigation-buttons";

type FormLayoutProps = {
  back: string;
  next: string;
  home?: boolean;
  children: React.ReactNode;
};

const FormLayout = ({children, back, next, home}: FormLayoutProps) => {
  const pathname = usePathname()

  const last_pathname =  pathname.split('/')[pathname.split('/').length - 1];

  const activeOne = last_pathname === "general_info";
  const activeTwo = last_pathname === "material_detail";
  const activeThree = last_pathname === "rfq_document";

  return (
    <div className='mb-5'>
        <div className='inline-block w-full'>
          <ul className='mb-5 grid grid-cols-5 gap-3 text-center'>
            <li>
              <div
                className={`${activeOne ? '!bg-primary text-white' : ''}
                                            block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                // onClick={() => setActiveTab(1)}
              >
                1 General Info
              </div>
            </li>

            <li>
              <div
                className={`${
                  activeTwo? '!bg-primary text-white' : ''
                } block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                // onClick={() => setActiveTab(2)}
              >
                2 Material Detail
              </div>
            </li>

            <li>
              <div
                className={`${
                  activeThree ? '!bg-primary text-white' : ''
                } block bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                // onClick={() => setActiveTab(3)}
              >
                3 RFQ Document
              </div>
            </li>
          </ul>

          <div>
            {children}
          </div>

          <div className="panel mb-5">
            <NavigationButton back={back} next={next} home={home} />
          </div>
        </div>
      </div>
  )
};

export default FormLayout;