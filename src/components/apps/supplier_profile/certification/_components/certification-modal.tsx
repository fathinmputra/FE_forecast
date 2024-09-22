'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Flatpickr from 'react-flatpickr';
import { useSelector } from "react-redux";
import Select from 'react-select';
import Swal from "sweetalert2";

import deleteBaseAttributes from "@/hooks/deleteBaseAttribute";

import IconX from "@/components/icon/icon-x";

import { IRootState } from "@/store";

import { useCreateSupplierCertification } from "@/app/api/hooks/supplier_profile/certification/useCRUDSupplierCertification";
import { useGetSupplierCertificationByPkid } from "@/app/api/hooks/supplier_profile/certification/useCRUDSupplierCertification";
import { useUpdateSupplierCertification } from "@/app/api/hooks/supplier_profile/certification/useCRUDSupplierCertification"; 
import { useGetAllCertificationType } from "@/app/api/hooks/supplier_profile/certification/useGetAllCertificationType";
import { supplierCertificationInitialState } from "@/helpers/utils/supplier_portal/supplier_certification";

interface IModalCertificationProps {
  modal: boolean;
  modalEdit: boolean;
  setModal: (value: boolean) => void;
  setModalEdit: (value: boolean) => void;
  refetch: () => void;
}

interface OptionSelect {
  pkid: string | number;
  name: string | number;
}

interface SelectedOption {
  value: string | number | Date | null | undefined;
  label: string;
}

const ModalCertification = ({
  modal,
  modalEdit,
  setModal,
  setModalEdit,
  refetch
}: IModalCertificationProps) => {
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listCertificationType } = useGetAllCertificationType();
  const { mutateAsync: createCertification } = useCreateSupplierCertification();
  const { mutateAsync: updateCertification } = useUpdateSupplierCertification();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(supplierCertificationInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [enabled, setEnabled] = useState(false);
  const {
    data: certificationDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetSupplierCertificationByPkid(pkid, enabled);

  // CHECK IF THE MODAL IS USED FOR EDITING
  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      setEnabled(true);
      refetchDetail();
    }
  }, [pkid, modalEdit, isLoading, refetchDetail]);

  useEffect(() => {
    if(certificationDetail && modalEdit) {
      setForm(certificationDetail);
    }
  })

  const mandatoryValidation = () => {
    const temp = { ...form };
    const requiredField = [] as string[];
    const exludeItemField = [
      'created_by',
      'created_date',
      'created_host',
      'updated_by',
      'updated_date',
      'updated_host',
      'is_deleted',
      'deleted_by',
      'deleted_date',
      'deleted_host',
    ] as string[];
    const requiredData = Object.keys(temp).filter(
      data => !exludeItemField.includes(data),
    )
    requiredData.forEach(field => {
      if (
        temp[field as keyof typeof temp] === null ||
        temp[field as keyof typeof temp] === '' ||
        temp[field as keyof typeof temp] === 0 ||
        temp[field as keyof typeof temp] === undefined
      ) {
        requiredField.push(field);
      }
    });
    if (requiredField.length > 0) {
      setEmptyField(requiredField);
      return false;
    }
    return true;
  }

  const handleOnChange = (
    value: string | Date | number | null,
    key: string,
  ) => {
    if (key.includes('date') && value instanceof Date) {
      const date = new Date(value.toString());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      value = `${year}-${month}-${day}`;
    }

    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    if(JSON.stringify(form) === JSON.stringify(supplierCertificationInitialState)) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(supplierCertificationInitialState);
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
            setForm(supplierCertificationInitialState);
            setEmptyField([]);
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      })
    }
  };

  const handleSubmit = async () => {
    const isMandatoryEmpty = mandatoryValidation();

    if(!isMandatoryEmpty) {
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
              
              await updateCertification({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createCertification(form);

              setModal(false);
            }
            setForm(supplierCertificationInitialState);
            setEmptyField([]);
            Swal.fire('Saved!', 'Your data has been saved.', 'success')
              .then(() => refetch());
          } catch (error) {
            Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleClose = () => {
    if(modalEdit) {
      setModalEdit(false);
      setForm(supplierCertificationInitialState);
    }
    if(modal) {
      setModal(false);
    }
  };

  return (
    <Transition appear show={modal || modalEdit} as={Fragment}>
      <Dialog
        as="div"
        open={modal || modalEdit}
        onClose={() => {
          if(modalEdit) {
            setModalEdit(true);
          }
          if(modal) {
            setModal(true);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <div
          id="slideIn_down_modal"
          className="fixed inset-0 z-[998] overflow-y-auto bg-[black]/60"
        >
          <div className="flex min-h-screen items-start justify-center px-4">
            <Dialog.Panel className='panel animate__animated animate__slideInDown dark:text-white-dark my-8 w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black'>
              <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">
                  {modal ? 'New' : 'Edit'} Supplier Certification
                </h5>
                <button
                  onClick={handleClose}
                  type='button'
                  className='text-white-dark hover:text-dark'
                >
                  <IconX />
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="modal_type">
                      Jenis Sertifikasi
                    </label>
                    <Select
                      id="modal_type_pkid"
                      name="modal_type_pkid"
                      placeholder="Jenis Sertifikasi"
                      className="basic-single"
                      options={listCertificationType?.map(
                        (item: OptionSelect) => ({
                          value: item.pkid,
                          label: item.name,
                        })
                      )}
                      isSearchable={true}
                      isClearable={true}
                      value={
                        form.type_pkid ? {
                          value: form.type_pkid ?? '',
                          label: listCertificationType?.find(
                            (item: OptionSelect) => item.pkid === form.type_pkid
                          )?.name ?? '',
                        } : null
                      }
                      onChange={(selectedOption: SelectedOption | null) => 
                        handleOnChange(selectedOption?.value || null, 'type_pkid')
                      }
                      styles={{
                        control: provided => ({
                          ...provided,
                          borderColor: emptyField.includes('type_pkid') ? 'red' : '',
                        }),
                        menu: provided => ({
                          ...provided,
                          zIndex: 9999
                        })
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="modal_name">
                      Jenis Sertifikasi
                    </label>
                    <input
                    id="modal_name"
                    name="modal_name"
                    placeholder="Nama Sertifikasi"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'name')
                    }
                    value={form.name || ''}
                    style={{
                      borderColor: emptyField.includes('name') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor="modal_certificate_number">
                      Nomor Serttifikasi
                    </label>
                    <input
                    id="modal_certificate_number"
                    name="modal_certificate_number" 
                    placeholder="Nomor Sertifikasi"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'certificate_number')
                    }
                    value={form.certificate_number || ''}
                    style={{
                      borderColor: emptyField.includes('certificate_number') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor="modal_released_by">
                      Penerbit
                    </label>
                    <input
                    id="modal_released_by"
                    name="modal_released_by"   
                    placeholder="Penerbit"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'released_by')
                    }
                    value={form.released_by || ''}
                    style={{
                      borderColor: emptyField.includes('released_by') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor="modal_released_by">
                      Tangal Berlaku
                    </label>
                    <Flatpickr
                      // value={date1}
                      id='modal_released_date'
                      name='modal_released_date'
                      placeholder='Tanggal Berlaku'
                      options={{
                        dateFormat: 'Y-m-d',
                        position: isRtl ? 'auto right' : 'auto left',
                      }}
                      className='form-input'
                      onChange={date =>
                        handleOnChange(
                          date[0],
                          'released_date',
                        )
                      }
                      value={form.released_date || ''}
                      style={{
                        borderColor: emptyField.includes('released_date')? 'red': '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="modal_expiration_date">
                      Tangal Berlaku
                    </label>
                    <Flatpickr
                      // value={date1}
                      id='modal_expiration_date'
                      name='modal_expiration_date'
                      placeholder='Tanggal Berakhir'
                      options={{
                        dateFormat: 'Y-m-d',
                        position: isRtl ? 'auto right' : 'auto left',
                      }}
                      className='form-input'
                      onChange={date =>
                        handleOnChange(
                          date[0],
                          'expiration_date',
                        )
                      }
                      value={form.expiration_date || ''}
                      style={{
                        borderColor: emptyField.includes('expiration_date')? 'red': '',
                      }}
                    />
                  </div>
                  <div className="mt-8 flex items-center justify-end">
                    <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleCancel}
                    >
                      Discard
                    </button>
                    <button
                    type="button"
                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                    onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
};

export default ModalCertification;