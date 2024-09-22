import { Menu, Transition } from '@headlessui/react';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import Link from 'next/link';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Fragment } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

import Dropdown from '@/components/dropdown';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconChecks from '@/components/icon/icon-checks';
import IconDownload from '@/components/icon/icon-download';
import IconEdit from '@/components/icon/icon-edit';
import IconEye from '@/components/icon/icon-eye';
import IconFile from '@/components/icon/icon-file';
import IconPrinter from '@/components/icon/icon-printer';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Skeleton from '@/components/Skeleton';

import { IRootState } from '@/store';
import { setModalEdit, setPkid } from '@/store/themeConfigSlice';

import { WorkflowStatus } from '@/helpers/utils/global/listStatus';
interface MyData {
  [key: string]: unknown;
}

interface DataTableColumn<T extends MyData> {
  accessor: string;
  title: string;
  sortable?: boolean;
  hidden?: boolean;
  render?: (record: T, index: number) => React.ReactNode;
}

interface IProps<T extends MyData> {
  title: string;
  data?: T[];
  columns?: DataTableColumn<T>[];
  isLoading?: boolean;
  deleteFunc?: (id: number) => void;
  approveFunc?: (id: number) => void;
  detailPath?: string;
  customDetailPath?: string;
  refetch?: () => void;
  hide_columns?: string[];
  action?: string;
  exportCSV?: () => void;
  handleDownloadRow?: (id: number) => void;
}

const RenderDataTable = <T extends MyData>({
  title,
  data,
  columns,
  isLoading,
  deleteFunc,
  approveFunc,
  detailPath,
  customDetailPath,
  refetch,
  hide_columns = [],
  action,
  exportCSV,
  handleDownloadRow, // Destructure handleDownloadRow
}: IProps<T>) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const dispatch = useDispatch();

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(data ? data : []);
  const [, setRecordsData] = useState(initialRecords);
  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'id',
    direction: 'asc',
  });

  const [hideCols, setHideCols] = useState<string[]>(hide_columns);

  const showHideColumns = (col: string) => {
    if (hideCols.includes(col)) {
      setHideCols((prevCols: string[]) =>
        prevCols.filter((d: string) => d !== col),
      );
    } else {
      setHideCols((prevCols: string[]) => [...prevCols, col]);
    }
  };

  const formatDate = (date: string) => {
    if (date) {
      date = date.split('T')[0];
      const dt = new Date(date);
      const month =
        dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
      return day + '/' + month + '/' + dt.getFullYear();
    }
    return '';
  };

  const sortedAndPaginatedRecords = useMemo(() => {
    const sortedData = sortBy(initialRecords, [sortStatus.columnAccessor]);
    if (sortStatus.direction === 'desc') {
      sortedData.reverse();
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    return sortedData.slice(from, to);
  }, [initialRecords, sortStatus, page, pageSize]);

  useEffect(() => {
    setInitialRecords(data || []);
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    if (data && columns) {
      setInitialRecords(
        data.filter((item: MyData) => {
          return columns?.some(col => {
            const columnValue = item[col.accessor];
            if (columnValue) {
              return columnValue
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase());
            }
            return false;
          });
        }),
      );
    }
  }, [search, data, columns]);

  const handleUpdateRow = (id: number) => {
    dispatch(setModalEdit(true));
    dispatch(setPkid(id));
  };

  const handleDeleteRow = (id: number) => {
    Swal.fire({
      title: 'Are you sure to delete?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          deleteFunc?.(id);
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success').then(
            () => {
              refetch?.();
            },
          );
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong', 'error');
        }
      }
    });
  };
  const handleApproveRow = (id: number) => {
    Swal.fire({
      title: 'Are you sure to approve?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          approveFunc?.(id);
          Swal.fire('Approve!', 'Your data has been approved.', 'success').then(
            () => {
              refetch?.();
            },
          );
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong', 'error');
        }
      }
    });
  };
  if (isLoading) {
    return <Skeleton className='h-full w-full' />;
  }

  return (
    <div className='panel mt-6'>
      <div className='mb-5 flex flex-col gap-5 px-5 md:flex-row md:items-center'>
        {title && <h2 className='text-xl font-semibold'>{title}</h2>}
        <div className='flex items-center gap-5 ltr:ml-auto rtl:mr-auto'>
          <div className='flex flex-wrap items-center'>
            <button type='button' className='btn btn-dark btn-sm m-1 '>
              <IconFile className='h-5 w-5 ltr:mr-2 rtl:ml-2' />
              Bulk Insert
            </button>
            <button
              type='button'
              onClick={exportCSV}
              className='btn btn-success btn-sm m-1 '
            >
              <IconFile className='h-5 w-5 ltr:mr-2 rtl:ml-2' />
              CSV
            </button>
            <button
              type='button'
              // onClick={() => exportTable('txt')}
              className='btn btn-info btn-sm m-1'
            >
              <IconFile className='h-5 w-5 ltr:mr-2 rtl:ml-2' />
              TXT
            </button>

            <button
              type='button'
              // onClick={() => exportTable('print')}
              className='btn btn-primary btn-sm m-1'
            >
              <IconPrinter className='ltr:mr-2 rtl:ml-2' />
              PRINT
            </button>
          </div>
          <div className='z-10 flex flex-col gap-5 md:flex-row md:items-center'>
            <div className='dropdown'>
              <Dropdown
                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                btnClassName='!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark'
                button={
                  <>
                    <span className='ltr:mr-1 rtl:ml-1'>Columns</span>
                    <IconCaretDown className='h-5 w-5' />
                  </>
                }
              >
                <ul className='!min-w-[140px]'>
                  {columns?.map((col, i) => {
                    return (
                      <li
                        key={i}
                        className='flex flex-col'
                        onClick={e => {
                          e.stopPropagation();
                        }}
                      >
                        <div className='flex items-center px-4 py-1'>
                          <label className='mb-0 cursor-pointer'>
                            <input
                              type='checkbox'
                              checked={!hideCols.includes(col.accessor)}
                              className='form-checkbox'
                              defaultValue={String(col?.accessor)}
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>,
                              ) => {
                                setHideCols(
                                  hideCols.filter(
                                    (d: string) =>
                                      d !== event.target.defaultValue,
                                  ),
                                );
                                showHideColumns(col.accessor);
                              }}
                            />
                            <span className='ltr:ml-2 rtl:mr-2'>
                              {col.title}
                            </span>
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </div>
          </div>
          <div className='text-right'>
            <input
              type='text'
              className='form-input'
              placeholder='Search...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='datatables'>
        <DataTable
          className='table-hover whitespace-nowrap'
          records={sortedAndPaginatedRecords}
          columns={
            columns
              ? columns.map((col, i) => {
                  return {
                    accessor: col.accessor,
                    title: col.title,
                    sortable: true,
                    hidden: hideCols.includes(col.accessor),
                    cellsClassName: `{ ${
                      i === columns.length - 1
                        ? 'sticky right-0 shadow-md bg-white dark:!border-[#191e3a] dark:bg-black'
                        : ''
                    }`,
                    titleClassName: `relative  ${
                      i === columns.length - 1 ? 'sticky right-0 z-10' : ''
                    }`,
                    render: (record: T, index: number) =>
                      col.render ? (
                        col.render(record, index)
                      ) : String(col.accessor).includes('date') ? (
                        formatDate(record[col.accessor] as string)
                      ) : String(col.accessor).includes('status') ? (
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-${
                            WorkflowStatus.find(
                              x => x.value === record[col.accessor],
                            )?.color
                          }-100 text-${
                            WorkflowStatus.find(
                              x => x.value === record[col.accessor],
                            )?.color
                          }-800`}
                        >
                          <div className='flex items-center justify-center'>
                            <div
                              className='mr-2 h-3 w-3 rounded-full'
                              style={{
                                backgroundColor: WorkflowStatus.find(
                                  x => x.value === record[col.accessor],
                                )?.color,
                              }}
                            />
                            {
                              WorkflowStatus.find(
                                x => x.value === record[col.accessor],
                              )?.label
                            }
                          </div>
                        </span>
                      ) : typeof record[col.accessor] === 'number' ||
                        (typeof record[col.accessor] === 'string' &&
                          !String(col.accessor).includes('date') &&
                          !isNaN(parseFloat(record[col.accessor] as string)) &&
                          !(record[col.accessor] as string).startsWith('0')) ? (
                        <div className='text-right'>
                          {new Intl.NumberFormat('de-DE').format(
                            parseFloat(record[col.accessor] as string),
                          )}
                        </div>
                      ) : typeof record[col.accessor] === 'string' &&
                        !isNaN(parseFloat(record[col.accessor] as string)) ? (
                        <div className='text-right'>
                          {record[col.accessor] as string}
                        </div>
                      ) : col.accessor === 'action' ? (
                        <div className='opa z-10 mx-auto flex w-max items-center gap-4'>
                          <div className='relative'>
                            <div className='dropdown'>
                              <div className='relative inline-block text-left'>
                                <Menu>
                                  {({ open }) => (
                                    <>
                                      <span className='rounded-md shadow-sm'>
                                        <Menu.Button className='focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800 dark:bg-black'>
                                          <HiOutlineDotsVertical className='h-4.5 w-4.5' />
                                        </Menu.Button>
                                      </span>

                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                      >
                                        <Menu.Items
                                          static
                                          className='absolute right-full z-10 -mt-10 mr-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                        >
                                          <div className='flex space-x-2 px-4 py-1'>
                                            {action?.includes('U') && (
                                              <>
                                                <Menu.Item data-tooltip-id='my-tooltip-edit'>
                                                  {({ active }) => (
                                                    <button
                                                      className={`${
                                                        active
                                                          ? 'bg-gray-100'
                                                          : 'text-gray-900'
                                                      } flex items-center rounded-xl px-2 py-2 text-sm`}
                                                      onClick={() => {
                                                        handleUpdateRow?.(
                                                          record.pkid as number,
                                                        );
                                                      }}
                                                    >
                                                      <IconEdit className='h-4.5 w-4.5 text-blue-600' />
                                                    </button>
                                                  )}
                                                </Menu.Item>
                                                <Tooltip
                                                  id='my-tooltip-edit'
                                                  content='Edit'
                                                  events={['hover']}
                                                  place={
                                                    isRtl ? 'left' : 'right'
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      'rgb(255, 255, 255)',
                                                    color: '#4361ee',
                                                  }}
                                                  className='z-50'
                                                />
                                              </>
                                            )}
                                            {action?.includes('R') && (
                                              <>
                                                <Menu.Item data-tooltip-id='my-tooltip-read'>
                                                  {({ active }) => (
                                                    <Link
                                                      href={`${detailPath}/${
                                                        customDetailPath
                                                          ? record[
                                                              customDetailPath
                                                            ]
                                                          : record.pkid
                                                      }`}
                                                      className={`${
                                                        active
                                                          ? 'bg-gray-100'
                                                          : 'text-gray-900'
                                                      } flex items-center rounded-xl px-2 py-2 text-sm`}
                                                    >
                                                      <IconEye className='h-4.5 w-4.5 text-yellow-600' />
                                                    </Link>
                                                  )}
                                                </Menu.Item>
                                                <Tooltip
                                                  id='my-tooltip-read'
                                                  content='Read'
                                                  events={['hover']}
                                                  place={
                                                    isRtl ? 'left' : 'right'
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      'rgb(255, 255, 255)',
                                                    color: '#4361ee',
                                                    zIndex: 99,
                                                  }}
                                                />
                                              </>
                                            )}
                                            {action?.includes('D') && (
                                              <>
                                                <Menu.Item data-tooltip-id='my-tooltip-delete'>
                                                  {({ active }) => (
                                                    <button
                                                      className={`${
                                                        active
                                                          ? 'bg-gray-100'
                                                          : 'text-gray-900'
                                                      } flex items-center rounded-xl px-2 py-2 text-sm`}
                                                      onClick={() => {
                                                        handleDeleteRow(
                                                          record.pkid as number,
                                                        );
                                                      }}
                                                    >
                                                      <IconTrashLines className='h-4.5 w-4.5 text-red-600' />
                                                    </button>
                                                  )}
                                                </Menu.Item>
                                                <Tooltip
                                                  id='my-tooltip-delete'
                                                  content='Delete'
                                                  events={['hover']}
                                                  place={
                                                    isRtl ? 'left' : 'right'
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      'rgb(255, 255, 255)',
                                                    color: '#4361ee',
                                                    zIndex: 99,
                                                  }}
                                                />
                                              </>
                                            )}
                                            {action?.includes('A') && (
                                              <>
                                                <Menu.Item data-tooltip-id='my-tooltip-delete'>
                                                  {({ active }) => (
                                                    <button
                                                      className={`${
                                                        active
                                                          ? 'bg-gray-100'
                                                          : 'text-gray-900'
                                                      } flex items-center rounded-xl px-2 py-2 text-sm`}
                                                      onClick={() => {
                                                        handleApproveRow(
                                                          (customDetailPath
                                                            ? record[
                                                                customDetailPath
                                                              ]
                                                            : record.pkid) as number,
                                                        );
                                                      }}
                                                    >
                                                      <IconChecks className='h-4.5 w-4.5 text-slate-600' />
                                                    </button>
                                                  )}
                                                </Menu.Item>
                                                <Tooltip
                                                  id='my-tooltip-delete'
                                                  content='Approve'
                                                  events={['hover']}
                                                  place={
                                                    isRtl ? 'left' : 'right'
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      'rgb(255, 255, 255)',
                                                    color: '#4361ee',
                                                    zIndex: 99,
                                                  }}
                                                />
                                              </>
                                            )}
                                            {action?.includes('X') && (
                                              <>
                                                <Menu.Item data-tooltip-id='my-tooltip-download'>
                                                  {({ active }) => (
                                                    <button
                                                      className={`${
                                                        active
                                                          ? 'bg-gray-100'
                                                          : 'text-gray-900'
                                                      } flex items-center rounded-xl px-2 py-2 text-sm`}
                                                      onClick={() => {
                                                        handleDownloadRow?.(
                                                          record.pkid as number,
                                                        ); // Call handleDownloadRow
                                                      }}
                                                    >
                                                      <IconDownload className='h-4.5 w-4.5 text-green-600' />
                                                    </button>
                                                  )}
                                                </Menu.Item>
                                                <Tooltip
                                                  id='my-tooltip-download'
                                                  content='Download'
                                                  events={['hover']}
                                                  place={
                                                    isRtl ? 'left' : 'right'
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      'rgb(255, 255, 255)',
                                                    color: '#4361ee',
                                                  }}
                                                  className='z-[999]'
                                                />
                                              </>
                                            )}
                                          </div>
                                        </Menu.Items>
                                      </Transition>
                                    </>
                                  )}
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : record[col.accessor] !== undefined &&
                        record[col.accessor] !== null ? (
                        String(record[col.accessor])
                      ) : (
                        '-'
                      ),
                  };
                })
              : []
          }
          highlightOnHover
          noRecordsText='No records found'
          totalRecords={initialRecords.length}
          recordsPerPage={pageSize}
          page={page}
          fetching={isLoading}
          onPageChange={p => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={400}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
          recordsPerPageLabel='Records per page'
        />
      </div>
    </div>
  );
};

export default RenderDataTable;
