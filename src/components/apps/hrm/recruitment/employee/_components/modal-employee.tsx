import { Dialog, Transition } from '@headlessui/react';
// import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';

import deleteBaseAttributes from '@/hooks/deleteBaseAttribute';

import IconX from '@/components/icon/icon-x';

import { IRootState } from '@/store';

import { useCreateEmployee } from '@/app/api/hooks/hrm/employee/useCreateEmployee';
import { useGetEmployeeByPkid } from '@/app/api/hooks/hrm/employee/useGetEmployeeByPkid';
import { useUpdateEmployee } from '@/app/api/hooks/hrm/employee/useUpdateEmployee';
import { useGetAllRecruitmentRequest } from '@/app/api/hooks/hrm/recruitment_request/useGetAllRecruitmentRequest';
import { employeeInitialState } from '@/helpers/utils/hrm/employee';

interface IModalEmployeeProps {
  modal: boolean;
  modalEdit: boolean;
  setModal: (value: boolean) => void;
  setModalEdit: (value: boolean) => void;
  refetch: () => void;
}
interface SelectedOption {
  value: string | number | null | undefined;
  label: string;
}
interface OptionSelect {
  pkid: string | number;
  req_id: string;
  position_id: string | number;
  Position: {
    name: string;
  };
  status: string;
  already_recruited: number;
  needed_number: number;
}
const optionsGender = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const ModalEmployee = ({
  modal,
  modalEdit,
  setModal,
  setModalEdit,
  refetch,
}: IModalEmployeeProps) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listRecruitmentRequest } = useGetAllRecruitmentRequest();
  const { mutateAsync: createEmployee } = useCreateEmployee();
  const { mutateAsync: updateEmployee } = useUpdateEmployee();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);
  const [form, setForm] = useState(employeeInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);

  const {
    data: employeeDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetEmployeeByPkid(pkid);

  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      refetchDetail();
      setForm(employeeDetail);
    }
  }, [pkid, modalEdit, employeeDetail, isLoading, refetchDetail]);

  const mandatoryValidation = () => {
    const temp = { ...form };
    const requiredField = [] as string[];
    const excludeItemField = [
      'ptkp_id',
      'updated_ptkp_id',
      'updated_ptkp_year',
      'updated_ptkp_issue',
      'amal_id',
      'asuransi_id',
      'nip',
      'npwp',
      'nik',
      'address',
      'phone',
      'country_code',
      'education',
      'signature_url',
      'kartu_keluarga_url',
      'verification_issue',
      'inactive_since',
      'PTKP',
      'Asuransi',
      'Amal',
    ] as string[];
    const requiredData = Object.keys(temp).filter(
      data => !excludeItemField.includes(data),
    );
    requiredData.forEach(field => {
      if (
        temp[field as keyof typeof temp] === null ||
        temp[field as keyof typeof temp] === '' ||
        temp[field as keyof typeof temp] === undefined
      ) {
        requiredField.push(field);
      }
    });
    if (requiredField.length > 0) {
      setEmptyField(requiredField);
      alert(`Required fields: ${requiredField.join(', ')}`);
      return false;
    }
    return true;
  };
  const handleOnChange = (value: string | number | Date, key: string) => {
    if (key.includes('date') && value instanceof Date) {
      const date = new Date(value.toString());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      value = `${year}-${month}-${day}`;
    }

    setForm({ ...form, [key]: value });
  };
  // const handleCancel = () => {
  //   if (JSON.stringify(form) === JSON.stringify(employeeInitialState)) {
  //     setModal(false);
  //     setForm(employeeInitialState);
  //     setEmptyField([]);
  //   } else {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'Your data will not be saved!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, Discard it!',
  //       cancelButtonText: 'No, cancel!',
  //     }).then(async result => {
  //       if (result.isConfirmed) {
  //         try {
  //           setModal(false);
  //           setForm(employeeInitialState);
  //           setEmptyField([]);
  //         } catch (error) {
  //           Swal.fire('Error!', 'Something went wrong', 'error');
  //         }
  //       }
  //     });
  //   }
  // };
  // const handleSubmit = async () => {
  //   const isMandatoryEmpty = mandatoryValidation();

  //   if (!isMandatoryEmpty) {
  //     Swal.fire({
  //       title: 'Some Field is Empty',
  //       text: 'Please fill all mandatory field',
  //       icon: 'error',
  //       confirmButtonText: 'Close',
  //     });
  //   } else {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You will not be able to revert this!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, Save it!',
  //       cancelButtonText: 'No, cancel!',
  //     }).then(async result => {
  //       if (result.isConfirmed) {
  //         try {
  //           if (modalEdit) {
  //             const tempForm = { ...form };
  //             const formAfterDeletion = deleteBaseAttributes(tempForm);

  //             await updateEmployee({
  //               pkid: pkid,
  //               data: formAfterDeletion,
  //             });
  //             setModalEdit(false);
  //           }
  //           if (modal) {
  //             await createEmployee(form);
  //             setModal(false);
  //           }

  //           setForm(employeeInitialState);
  //           setEmptyField([]);
  //           Swal.fire(
  //             'Saved!',
  //             'Your category has been saved.',
  //             'success',
  //           ).then(() => {
  //             refetch();
  //           });
  //         } catch (error) {
  //           Swal.fire('Error!', 'Something went wrong', 'error');
  //         }
  //       }
  //     });
  //   }
  // };

  const handleCancel = () => {
    if (JSON.stringify(form) === JSON.stringify(employeeInitialState)) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(employeeInitialState);
      setEmptyField([]);
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your data will not be saved!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Discard it!',
        cancelButtonText: 'No, cancel!',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            if (modalEdit) {
              setModalEdit(false);
            }
            if (modal) {
              setModal(false);
            }
            setForm(employeeInitialState);
            setEmptyField([]);
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleSubmit = async () => {
    const isMandatoryEmpty = mandatoryValidation();

    if (!isMandatoryEmpty) {
      await Swal.fire({
        title: 'Some Field is Empty',
        text: 'Please fill all mandatory field',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'No, cancel!',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            if (modalEdit) {
              const tempForm = { ...form };
              const formAfterDeletion = deleteBaseAttributes(tempForm);

              await updateEmployee({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createEmployee(form);
              setModal(false);
            }
            setForm(employeeInitialState);
            setEmptyField([]);
            Swal.fire(
              'Saved!',
              'Your employee has been saved.',
              'success',
            ).then(() => {
              refetch();
            });
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleClose = () => {
    if (modalEdit) {
      setModalEdit(false);
      setForm(employeeInitialState);
    }
    if (modal) {
      setModal(false);
    }
  };

  return (
    <Transition appear show={modal || modalEdit} as={Fragment}>
      <Dialog
        as='div'
        open={modal || modalEdit}
        onClose={() => {
          if (modalEdit) {
            setModalEdit(true);
          }
          if (modal) {
            setModal(true);
          }
        }}
      >
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
          <div className='flex min-h-screen items-start justify-center px-4'>
            <Dialog.Panel className='panel animate__animated animate__slideInDown dark:text-white-dark my-8 w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black'>
              <div className='flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]'>
                <h5 className='text-lg font-bold'>New Position</h5>
                <button
                  onClick={handleClose}
                  type='button'
                  className='text-white-dark hover:text-dark'
                >
                  <IconX />
                </button>
              </div>
              <div className='p-5'>
                <div className='space-y-5'>
                  <div>
                    <label htmlFor='email'>
                      Email <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Email'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'email')
                      }
                      value={form.email || ''}
                      style={{
                        borderColor: emptyField.includes('title') ? 'red' : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='fullname'>
                      Full name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='fullname'
                      name='fullname'
                      type='form-textarea'
                      placeholder='Full name'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'fullname')
                      }
                      value={form.fullname || ''}
                      style={{
                        borderColor: emptyField.includes('title') ? 'red' : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='gender'>
                      Jenis Kelamin<span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                      id='gender'
                      name='gender'
                      placeholder='Gender'
                      className='basic-single'
                      options={optionsGender}
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={150}
                      menuPlacement='top'
                      styles={{
                        menu: provided => ({
                          ...provided,
                          zIndex: 9999, // Set a high z-index value
                        }),
                        control: provided => ({
                          ...provided,
                          borderColor: emptyField.includes('gender')
                            ? 'red'
                            : '',
                        }),
                      }}
                      onChange={(selectedOption: SelectedOption | null) =>
                        handleOnChange(selectedOption?.value || '', 'gender')
                      }
                      value={
                        form.gender
                          ? {
                              value: form.gender ?? '',
                              label: form.gender ?? '',
                            }
                          : null
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor='req_id'>
                      Recruitment Request
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                      id='req_id'
                      name='req_id'
                      placeholder='Select Recruitment Request'
                      className='basic-single text-'
                      options={
                        listRecruitmentRequest
                          ? listRecruitmentRequest
                              .reduce(
                                (
                                  acc: OptionSelect[],
                                  current: OptionSelect,
                                ) => {
                                  // Check if the current item's req_id already exists in the accumulator
                                  const exists = acc.some(
                                    item => item.pkid === current.pkid,
                                  );
                                  // If it doesn't exist, add it to the accumulator
                                  if (!exists) {
                                    acc.push(current);
                                  }
                                  return acc;
                                },
                                [],
                              )
                              .filter(
                                (item: OptionSelect) =>
                                  item.status === 'Open' &&
                                  (item.already_recruited ?? 0) <
                                    item.needed_number,
                              ) // Add this line
                              .map((item: OptionSelect) => ({
                                value: item.pkid, // Use pkid as value
                                label: `${item.pkid} - ${item.Position.name}`,
                                position_id: item.position_id, // Include position_id in the option
                                // Change user_id later because BE will return the user_id
                                // user_id:0 , // Include user_id in the option
                              }))
                          : []
                      }
                      onChange={(
                        selectedOption: {
                          value: string;
                          label: string;
                          position_id: string;
                        } | null,
                      ) => {
                        // Update the reqId and positionId state variables
                        setForm({
                          ...form,
                          req_id: selectedOption?.value || '',
                          position_id: selectedOption?.position_id || '',
                        });
                      }}
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={150}
                      menuPlacement='top'
                      styles={{
                        menu: provided => ({
                          ...provided,
                          zIndex: 9999, // Set a high z-index value
                        }),
                        control: provided => ({
                          ...provided,
                          borderColor: emptyField.includes('req_id')
                            ? 'red'
                            : '',
                        }),
                      }}
                      // onChange={(selectedOption: SelectedOption | null) =>
                      //   handleOnChange(
                      //     selectedOption?.value || '',
                      //     'req_id',
                      //   )
                      // }
                      value={
                        form.req_id
                          ? {
                              value: form.req_id ?? '',
                              label:
                                listRecruitmentRequest?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === form.req_id,
                                )?.Position.name ?? '',
                              position_id: '', // Add the missing position_id property
                              // user_id: 0, // Add the missing user_id property
                            }
                          : undefined // Change null to undefined to match the type 'PropsValue<{ value: string; label: string; position_id: string; }> | undefined'
                      }
                    />
                  </div>
                  {/* <div>
                    <label htmlFor='date'>
                      Date Joined <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='join_date'
                      name='join_date'
                      type='date'
                      placeholder='join_date'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'join_date')
                      }
                      value={form.join_date || ''}
                      style={{
                        borderColor: emptyField.includes('title') ? 'red' : '',
                      }}
                    />
                  </div> */}
                  <div>
                    <label htmlFor='date'>
                      Tanggal Mulai Penyusutan Aset{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Flatpickr
                      // value={date1}
                      id='join_date'
                      name='join_date'
                      type='date'
                      placeholder='Pilih Tanggal'
                      options={{
                        dateFormat: 'Y-m-d',
                        position: isRtl ? 'auto right' : 'auto left',
                      }}
                      className='form-input'
                      onChange={date => handleOnChange(date[0], 'join_date')}
                      value={form.join_date || ''}
                      style={{
                        borderColor: emptyField.includes('join_date')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                </div>
                <div className='mt-8 flex items-center justify-end'>
                  <button
                    onClick={handleCancel}
                    type='button'
                    className='btn btn-outline-danger'
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSubmit}
                    type='button'
                    className='btn btn-primary ltr:ml-4 rtl:mr-4'
                  >
                    Save
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalEmployee;
