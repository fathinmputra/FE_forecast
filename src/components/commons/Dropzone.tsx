import React, {useCallback, useState} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import Image from 'next/image'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';

interface FileWithPreview extends File {
  preview: string;
}

interface DropzoneProps {
  // onDrop: (acceptedFiles: File[]) => void
  className: string;
  multiple?: boolean
}

const Dropzone = ({className, multiple=true}: DropzoneProps ) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    console.log(acceptedFiles)
    if(acceptedFiles?.length) {

      setFiles(previeousFiles => [
        ...previeousFiles,
        ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
      ]);
    }

    if(rejectedFiles?.length) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The file does not fit!',
      })
    }
  }, [])

  const removeFile = (name: string) => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const {acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxSize: 1024 * 1000 * 10, // maxSize is 10MB
    multiple: multiple,
    ...(multiple ? {} : {maxFiles: 1})
  })

  /* SUBMIT FORM */
  // const handleSubmit = async e => {
  //   e.preventDefault()

  //   if (!files?.length) return

  //   const formData = new FormData()
  //   files.forEach(file => formData.append('file', file))
  //   formData.append('upload_preset', 'friendsbook')

  //   const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL
  //   const data = await fetch(URL, {
  //     method: 'POST',
  //     body: formData
  //   }).then(res => res.json())

  //   console.log(data)
  // }

  return (
    <>
      <div {...getRootProps({
        className: `${files.length === 0 ? 'pt-16' : 'pt-4'} pb-16 px-16 mt-4 border border-neutral-200`
      })}>
        <input {...getInputProps()} />
        {
          files.length === 0 ?
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag and drop some files here, or click to select files</p> :
            <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
              {files.map(file => (
                <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                  <Image
                    src={
                      file.type.includes('image') ? file.preview : '/assets/images/file-icon.svg'
                    }
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview)
                    }}
                    className='h-full w-full object-contain rounded-md'
                  />
                  <button
                    type='button'
                    className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(file.name)
                    }}
                  >
                    {/* <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' /> */}
                    <IoMdClose className='z-[]'/>
                  </button>
                  <p className='mt-2 text-neutral-500 text-[12px] font-medium truncate'>
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>
        }
      </div>
    </>
  )
};

export default Dropzone;