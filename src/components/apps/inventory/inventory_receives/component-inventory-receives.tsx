'use client';

import { Tab } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import ModalNewReceive from '@/components/apps/inventory/inventory_receives/_components/modal-new-receives';
import ModalRejectedReceivesTable from '@/components/apps/inventory/inventory_receives/_components/modal-rejected-receives';
import ReceivesTable from '@/components/apps/inventory/inventory_receives/_components/receives-table';
import RejectedReceivesTable from '@/components/apps/inventory/inventory_receives/_components/rejected-receives-table';

import { useGetAllReceives } from '@/app/api/hooks/inventory/receive/useCRUDReceive';
import { useGetAllRejectedReceives } from '@/app/api/hooks/inventory/receive/useCRUDReceive';

const ComponentsInventoryReceives = () => {
  const pathname = usePathname();
  const { data: listReceives, isLoading, refetch } = useGetAllReceives();
  const { data: listRejected, refetch: refetchRejected } =
    useGetAllRejectedReceives();

  const [modalForm, setModalForm] = useState(false);
  const handleSetModal = (isOpen: boolean) => {
    setModalForm(isOpen);
  };
  const [modalFormRejected, setModalFormRejected] = useState(false);
  const handleSetModalRejected = (isOpen: boolean) => {
    setModalFormRejected(isOpen);
  };
  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='flex gap-2'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => handleSetModal(true)}
        >
          Add New Recieve
        </button>
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => handleSetModalRejected(true)}
        >
          Rejected Recieve
        </button>
      </div>
      <ModalNewReceive
        modal={modalForm}
        setModal={handleSetModal}
        refetch={refetch}
      />
      <ModalRejectedReceivesTable
        modal={modalFormRejected}
        setModal={handleSetModalRejected}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col sm:h-[calc(100vh_-_150px)]'>
        <Tab.Group>
          <Tab.List className='border-white-light mt-3 flex flex-wrap border-b dark:border-[#191e3a]'>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  type='button'
                  className={`${
                    selected
                      ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black '
                      : ''
                  } hover:text-primary -mb-[1px] block border border-transparent p-3.5 py-2 dark:hover:border-b-black`}
                >
                  Receive Items
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  type='button'
                  className={`${
                    selected
                      ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black '
                      : ''
                  }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`}
                >
                  Rejected Receive
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className='text-sm'>
            <Tab.Panel>
              <ReceivesTable
                data={listReceives}
                isLoading={isLoading}
                refetch={refetch}
              />
            </Tab.Panel>
            <Tab.Panel>
              <RejectedReceivesTable
                data={listRejected}
                refetch={refetchRejected}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ComponentsInventoryReceives;
