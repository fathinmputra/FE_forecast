'use client';

import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { useGetAllSupplierDocumentType } from '@/app/api/hooks/supplier_profile/document/useGetAllSupplierDocumentType';
import {
  useCreateSupplierDocument,
  useGetSupplierDocumentByPkid,
  useUpdateSupplierDocument,
} from '@/app/api/hooks/supplier_profile/document/useCRUDSupplierDocument';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { supplierDocumentInitialState } from '@/helpers/utils/supplier_portal/supplier_document';
import Swal from 'sweetalert2';
import deleteBaseAttributes from '@/hooks/deleteBaseAttribute';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '@/components/icon/icon-x';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';
import Dropzone from '@/components/commons/Dropzone';

interface IModalDocumentProps {
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
  value: string | number | null | undefined;
  label: string;
}

const ModalDocument = ({
  modal,
  modalEdit,
  setModal,
  setModalEdit,
  refetch,
}: IModalDocumentProps) => {
  // ----
  // const onDrop = useCallback((acceptedFiles: FileList) => {
  //   // Do something with the files
  // }, [])
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  // ----
  
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  
  // ----
  const [images2, setImages2] = useState<ImageListType>([]);
  const maxNumber = 69;
  const onChange2 = (imageList: ImageListType) => {
    setImages2(imageList as never[]);
  };
  /// ----

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listDocumentType } = useGetAllSupplierDocumentType();
  const { mutateAsync: createDocument } = useCreateSupplierDocument();
  const { mutateAsync: updateDocument } = useUpdateSupplierDocument();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(supplierDocumentInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [enabled, setEnabled] = useState(false);
  const {
    data: DocumentDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetSupplierDocumentByPkid(pkid, enabled);

  // CHECK IF THE MODAL IS USED FOR EDITING
  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      setEnabled(true);
      refetchDetail();
    }
  }, [pkid, modalEdit, isLoading, refetchDetail]);

  useEffect(() => {
    if (DocumentDetail && modalEdit) {
      setForm(DocumentDetail);
    }
  });

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
    );
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
  };

  const handleOnChange = (value: string | number | null, key: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    if (JSON.stringify(form) === JSON.stringify(supplierDocumentInitialState)) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(supplierDocumentInitialState);
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
            setForm(supplierDocumentInitialState);
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

              await updateDocument({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createDocument(form);

              setModal(false);
            }
            setForm(supplierDocumentInitialState);
            setEmptyField([]);
            Swal.fire('Saved!', 'Your data has been saved.', 'success').then(
              () => refetch(),
            );
          } catch (error) {
            Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleClose = () => {
    if (modalEdit) {
      setModalEdit(false);
      setForm(supplierDocumentInitialState);
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
                <h5 className='text-lg font-bold'>
                  {modal ? 'New' : 'Edit'} Supplier Document
                </h5>
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
                    <label htmlFor='modal_document_type'>Jenis Dokumen</label>
                    <Select
                      id='modal_document_type'
                      name='modal_document_type'
                      placeholder='Jenis Dokumen'
                      className='basic-single'
                      options={listDocumentType?.map((item: OptionSelect) => ({
                        value: item.pkid,
                        label: item.name,
                      }))}
                      isSearchable={true}
                      isClearable={true}
                      value={
                        form.type_pkid
                          ? {
                              value: form.type_pkid ?? '',
                              label:
                                listDocumentType?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === form.type_pkid,
                                )?.name ?? '',
                            }
                          : null
                      }
                      onChange={(selectedOption: SelectedOption | null) =>
                        handleOnChange(
                          selectedOption?.value || null,
                          'type_pkid',
                        )
                      }
                      styles={{
                        control: provided => ({
                          ...provided,
                          borderColor: emptyField.includes('type_pkid')
                            ? 'red'
                            : '',
                        }),
                        menu: provided => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_document_name'>Nama Dokumen</label>
                    <input
                      id='modal_document_name'
                      name='modal_document_name'
                      placeholder='Nama Dokumen'
                      className='form-input'
                      type='text'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'name')
                      }
                      value={form.name || ''}
                      style={{
                        borderColor: emptyField.includes('name') ? 'red' : '',
                      }}
                    />
                  </div>


                  <div>
                    <label htmlFor='modal_document_file'>Jenis Dokumen</label>
                    <Dropzone className='' multiple={false} />
                  </div>



                  {/* <div
                    className='custom-file-container'
                    data-upload-id='mySecondImage'
                  >
                    <div className='label-container'>
                      <label htmlFor='multi-file-upload'>Upload </label>
                      <button
                        type='button'
                        className='custom-file-container__image-clear'
                        title='Clear Image'
                        onClick={() => {
                          setImages2([]);
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <input
                      id='multi-file-upload'
                      type='file'
                      className='custom-file-container__custom-file__custom-file-input'
                      accept='image/*'
                      multiple
                    />
                    <input
                      type='hidden'
                      name='MAX_FILE_SIZE'
                      value='10485760'
                    />
                    <ImageUploading
                      multiple
                      value={images2}
                      onChange={onChange2}
                      maxNumber={maxNumber}
                    >
                      {({ imageList, onImageUpload, onImageRemove }) => (
                        <div className='upload__image-wrapper'>
                          <button
                            className='custom-file-container__custom-file__custom-file-control'
                            onClick={onImageUpload}
                          >
                            Choose File...
                          </button>
                          &nbsp;
                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                            {imageList.map((image, index) => (
                              <div
                                key={
                                  image.file
                                    ? `${image.file.name}-${image.file.lastModified}`
                                    : index
                                }
                                className='custom-file-container__image-preview relative'
                              >
                                <button
                                  type='button'
                                  className='custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark absolute left-0 top-0 block w-fit rounded-full p-0.5'
                                  title='Clear Image'
                                  onClick={() => onImageRemove(index)}
                                >
                                  <IconX className='h-3 w-3' />
                                </button>
                                <Image
                                  src={image.dataURL ?? ''}
                                  alt='img'
                                  className='!max-h-48 w-full rounded object-cover shadow'
                                  width={100}
                                  height={100}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                    {images2.length === 0 ? (
                      <Image
                        src='/assets/images/file-preview.svg'
                        className='m-auto w-full max-w-md'
                        alt=''
                        width={100}
                        height={100}
                      />
                    ) : (
                      ''
                    )}
                  </div> */}



                  <div className='mt-8 flex items-center justify-end'>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={handleCancel}
                    >
                      Discard
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary ltr:ml-4 rtl:mr-4'
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
  );
};

export default ModalDocument;
