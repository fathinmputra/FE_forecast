import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import Select, { SingleValue } from 'react-select';
import Swal from 'sweetalert2';

import IconLoader from '@/components/icon/icon-loader';
import IconX from '@/components/icon/icon-x';

import { useCreateTransferSale } from '@/app/api/hooks/inventory/transfer/useCRUDTransfer';
import { useGetAllSalesOrders } from '@/app/api/hooks/sales/sales_order/useCRUDSalesOrder';
import { SelectOptionProperty } from '@/helpers/utils/component/select';
import { NewTransferSaleProps } from '@/helpers/utils/inventory/inventory_transfer';
import {
  SalesOrderDetailProperty,
  salesOrderInitialState,
  SalesOrderProperty,
} from '@/helpers/utils/sales/sales';

interface IModalNewTransferProps {
  modal: boolean;
  setModal: (value: boolean) => void;
  refetch: () => void;
}

const ModalNewTransfer = ({
  modal,
  setModal,
  refetch,
}: IModalNewTransferProps) => {
  const { data: listSalesOrders } = useGetAllSalesOrders();
  const { mutateAsync: createTransferSale } = useCreateTransferSale();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [purchaseDropdown, setSalesDropdown] = useState(
    [] as SelectOptionProperty[],
  );

  useEffect(() => {
    if (listSalesOrders) {
      const purchase = listSalesOrders.map((item: SalesOrderProperty) => {
        return {
          value: item.pkid,
          label: item.code,
        };
      });
      setSalesDropdown(purchase);
    }
  }, [listSalesOrders]);

  const [form, setForm] = useState(salesOrderInitialState);

  const handleSalesChange = (value: SingleValue<SelectOptionProperty>) => {
    if (value) {
      const findData = listSalesOrders.find(
        (item: SalesOrderProperty) => item.pkid === Number(value.value),
      );
      if (findData) {
        setForm(findData);
      }
    }
  };

  const mandatoryValidation = () => {
    return true;
  };

  const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const isMandatoryEmpty = mandatoryValidation();

    if (!isMandatoryEmpty) {
      Swal.fire({
        title: 'Some Field is Empty',
        text: 'Please fill all mandatory field',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Make sure all data is correct',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'No, cancel!',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            setIsLoadingCreate(true);
            await createTransferSale({
              sales_id: form.code,
              items_opt: form.SalesOrderDetails.map(
                (item: SalesOrderDetailProperty) => {
                  return {
                    item_code: item.item,
                    fix_qty: item.quantity,
                  };
                },
              ),
            } as NewTransferSaleProps);
            setIsLoadingCreate(false);
            setModal(false);
            setForm(salesOrderInitialState);
            Swal.fire('Saved!', 'Your item has been saved.', 'success').then(
              () => {
                refetch();
              },
            );
          } catch (error) {
            setIsLoadingCreate(false);
            Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as='div' open={modal} onClose={() => setModal(true)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0' />
        </Transition.Child>
        <div
          id='slideIn_down_modal'
          className='fixed inset-0 z-[998] overflow-y-auto bg-[black]/60'
        >
          <form className='flex min-h-screen items-start justify-center px-4'>
            <Dialog.Panel className='panel animate__animated animate__slideInDown dark:text-white-dark my-8 w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black'>
              <div className='flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]'>
                <h5 className='text-lg font-bold'>Create New Transfer</h5>
                <button
                  onClick={() => setModal(false)}
                  type='button'
                  className='text-white-dark hover:text-dark'
                >
                  <IconX />
                </button>
              </div>
              <div className='flex min-h-[40vh] flex-col justify-between p-5'>
                <div className='space-y-5'>
                  <div className='flex gap-2'>
                    <div className='w-full'>
                      <label htmlFor='purchase_id'>
                        Choose Sales <span className='text-red-500'>*</span>
                      </label>
                      <Select
                        options={purchaseDropdown}
                        onChange={handleSalesChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor='invoice'>Invoice</label>
                    <input
                      id='invoice'
                      name='invoice'
                      className='form-input'
                      value={form.invoice || ''}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor='createdAt'>Sale At</label>
                    <input
                      id='createdAt'
                      name='createdAt'
                      className='form-input'
                      value={form.createdAt || ''}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor='supplier_id'>Customer Name</label>
                    <input
                      id='supplier_id'
                      name='supplier_id'
                      className='form-input'
                      value={form.Customer.name || ''}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor='supplier_id'>Customer Address</label>
                    <input
                      id='supplier_id'
                      name='supplier_id'
                      className='form-input'
                      value={form.Customer.address || ''}
                      disabled
                    />
                  </div>
                  <div className='table-responsive space-y-5'>
                    <table className='w-full table-auto'>
                      <thead>
                        <tr>
                          <th className='border'>Item</th>
                          <th className='border'>Quantity</th>
                          <th className='border'>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.SalesOrderDetails.map(
                          (item: SalesOrderDetailProperty, index: number) => (
                            <tr key={index}>
                              <td className='border'>{item.item}</td>
                              <td className='border'>{item.quantity}</td>
                              <td className='border'>{item.price}</td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='flex flex-row-reverse p-5'>
                {isLoadingCreate ? (
                  <button type='button' className='btn btn-primary !mt-6'>
                    <IconLoader className='inline-block shrink-0 animate-[spin_2s_linear_infinite] align-middle ltr:mr-2 rtl:ml-2' />
                    Loading
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='btn btn-primary !mt-6'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </form>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalNewTransfer;
