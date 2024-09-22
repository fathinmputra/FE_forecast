import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import IconCalendar from '@/components/icon/icon-calendar';
import IconClock from '@/components/icon/icon-clock';
import IconCoffee from '@/components/icon/icon-coffee';
import IconCreditCard from '@/components/icon/icon-credit-card';
import IconDribble from '@/components/icon/icon-dribble';
import IconGithub from '@/components/icon/icon-github';
import IconMail from '@/components/icon/icon-mail';
import IconMapPin from '@/components/icon/icon-map-pin';
import IconPencilPaper from '@/components/icon/icon-pencil-paper';
import IconPhone from '@/components/icon/icon-phone';
import IconShoppingBag from '@/components/icon/icon-shopping-bag';
import IconTag from '@/components/icon/icon-tag';
import IconTwitter from '@/components/icon/icon-twitter';
import ComponentsUsersProfilePaymentHistory from '@/components/users/profile/components-users-profile-payment-history';

export const metadata: Metadata = {
  title: 'Profile',
};

const Profile = () => {
  return (
    <div>
      <ul className='flex space-x-2 rtl:space-x-reverse'>
        <li>
          <Link href='#' className='text-primary hover:underline'>
            Users
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Profile</span>
        </li>
      </ul>
      <div className='pt-5'>
        <div className='mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4'>
          <div className='panel'>
            <div className='mb-5 flex items-center justify-between'>
              <h5 className='dark:text-white-light text-lg font-semibold'>
                Profile
              </h5>
              <Link
                href='src/app/(dashboard)/users/user-account-settings'
                className='btn btn-primary rounded-full p-2 ltr:ml-auto rtl:mr-auto'
              >
                <IconPencilPaper />
              </Link>
            </div>
            <div className='mb-5'>
              <div className='flex flex-col items-center justify-center'>
                <div className='mb-5 h-24 w-24 overflow-hidden rounded-full'>
                  <Image
                    src='/assets/images/profile-34.jpeg'
                    alt='img'
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
                <p className='text-primary text-xl font-semibold'>
                  Jimmy Turner
                </p>
              </div>
              <ul className='text-white-dark m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold'>
                <li className='flex items-center gap-2'>
                  <IconCoffee className='shrink-0' /> Web Developer
                </li>
                <li className='flex items-center gap-2'>
                  <IconCalendar className='shrink-0' />
                  Jan 20, 1989
                </li>
                <li className='flex items-center gap-2'>
                  <IconMapPin className='shrink-0' />
                  New York, USA
                </li>
                <li>
                  <button className='flex items-center gap-2'>
                    <IconMail className='h-5 w-5 shrink-0' />
                    <span className='text-primary truncate'>
                      jimmy@gmail.com
                    </span>
                  </button>
                </li>
                <li className='flex items-center gap-2'>
                  <IconPhone />
                  <span className='whitespace-nowrap' dir='ltr'>
                    +1 (530) 555-12121
                  </span>
                </li>
              </ul>
              <ul className='mt-7 flex items-center justify-center gap-2'>
                <li>
                  <button className='btn btn-info flex h-10 w-10 items-center justify-center rounded-full p-0'>
                    <IconTwitter className='h-5 w-5' />
                  </button>
                </li>
                <li>
                  <button className='btn btn-danger flex h-10 w-10 items-center justify-center rounded-full p-0'>
                    <IconDribble />
                  </button>
                </li>
                <li>
                  <button className='btn btn-dark flex h-10 w-10 items-center justify-center rounded-full p-0'>
                    <IconGithub />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className='panel lg:col-span-2 xl:col-span-3'>
            <div className='mb-5'>
              <h5 className='dark:text-white-light text-lg font-semibold'>
                Task
              </h5>
            </div>
            <div className='mb-5'>
              <div className='table-responsive dark:text-white-light font-semibold text-[#515365]'>
                <table className='whitespace-nowrap'>
                  <thead>
                    <tr>
                      <th>Projects</th>
                      <th>Progress</th>
                      <th>Task Done</th>
                      <th className='text-center'>Time</th>
                    </tr>
                  </thead>
                  <tbody className='dark:text-white-dark'>
                    <tr>
                      <td>Figma Design</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-danger w-[29.56%] rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-danger'>29.56%</td>
                      <td className='text-center'>2 mins ago</td>
                    </tr>
                    <tr>
                      <td>Vue Migration</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-info w-1/2 rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-success'>50%</td>
                      <td className='text-center'>4 hrs ago</td>
                    </tr>
                    <tr>
                      <td>Flutter App</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-warning w-[39%]  rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-danger'>39%</td>
                      <td className='text-center'>a min ago</td>
                    </tr>
                    <tr>
                      <td>API Integration</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-success w-[78.03%]  rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-success'>78.03%</td>
                      <td className='text-center'>2 weeks ago</td>
                    </tr>

                    <tr>
                      <td>Blog Update</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-secondary  w-full  rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-success'>100%</td>
                      <td className='text-center'>18 hrs ago</td>
                    </tr>
                    <tr>
                      <td>Landing Page</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-danger w-[19.15%]  rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-danger'>19.15%</td>
                      <td className='text-center'>5 days ago</td>
                    </tr>
                    <tr>
                      <td>Shopify Dev</td>
                      <td>
                        <div className='dark:bg-dark/40 flex h-1.5 w-full rounded-full bg-[#ebedf2]'>
                          <div className='bg-primary w-[60.55%] rounded-full'></div>
                        </div>
                      </td>
                      <td className='text-success'>60.55%</td>
                      <td className='text-center'>8 days ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <div className='panel'>
            <div className='mb-5'>
              <h5 className='dark:text-white-light text-lg font-semibold'>
                Summary
              </h5>
            </div>
            <div className='space-y-4'>
              <div className='rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]'>
                <div className='flex items-center justify-between p-4 py-2'>
                  <div className='bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light grid h-9 w-9 place-content-center rounded-md'>
                    <IconShoppingBag />
                  </div>
                  <div className='flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4'>
                    <h6 className='text-white-dark dark:text-white-dark text-[13px]'>
                      Income
                    </h6>
                    <span className='dark:text-white-light block text-base text-[#515365]'>
                      $92,600
                    </span>
                    <p className='text-secondary ltr:ml-auto rtl:mr-auto'>
                      90%
                    </p>
                  </div>
                </div>
              </div>
              <div className='rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]'>
                <div className='flex items-center justify-between p-4 py-2'>
                  <div className='bg-info-light text-info dark:bg-info dark:text-info-light grid h-9 w-9 place-content-center rounded-md'>
                    <IconTag />
                  </div>
                  <div className='flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4'>
                    <h6 className='text-white-dark dark:text-white-dark text-[13px]'>
                      Profit
                    </h6>
                    <span className='dark:text-white-light block text-base text-[#515365]'>
                      $37,515
                    </span>
                    <p className='text-info ltr:ml-auto rtl:mr-auto'>65%</p>
                  </div>
                </div>
              </div>
              <div className='rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]'>
                <div className='flex items-center justify-between p-4 py-2'>
                  <div className='bg-warning-light text-warning dark:bg-warning dark:text-warning-light grid h-9 w-9 place-content-center rounded-md'>
                    <IconCreditCard />
                  </div>
                  <div className='flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4'>
                    <h6 className='text-white-dark dark:text-white-dark text-[13px]'>
                      Expenses
                    </h6>
                    <span className='dark:text-white-light block text-base text-[#515365]'>
                      $55,085
                    </span>
                    <p className='text-warning ltr:ml-auto rtl:mr-auto'>80%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='panel'>
            <div className='mb-10 flex items-center justify-between'>
              <h5 className='dark:text-white-light text-lg font-semibold'>
                Pro Plan
              </h5>
              <button className='btn btn-primary'>Renew Now</button>
            </div>
            <div className='group'>
              <ul className='text-white-dark mb-7 list-inside list-disc space-y-2 font-semibold'>
                <li>10,000 Monthly Visitors</li>
                <li>Unlimited Reports</li>
                <li>2 Years Data Storage</li>
              </ul>
              <div className='mb-4 flex items-center justify-between font-semibold'>
                <p className='bg-dark text-white-light flex items-center rounded-full px-2 py-1 text-xs font-semibold'>
                  <IconClock className='h-3 w-3 ltr:mr-1 rtl:ml-1' />5 Days Left
                </p>
                <p className='text-info'>$25 / month</p>
              </div>
              <div className='bg-dark-light dark:bg-dark-light/10 mb-5 h-2.5 overflow-hidden rounded-full p-0.5'>
                <div
                  className='relative h-full w-full rounded-full bg-gradient-to-r from-[#f67062] to-[#fc5296]'
                  style={{ width: '65%' }}
                ></div>
              </div>
            </div>
          </div>
          <ComponentsUsersProfilePaymentHistory />
          <div className='panel'>
            <div className='mb-5 flex items-center justify-between'>
              <h5 className='dark:text-white-light text-lg font-semibold'>
                Card Details
              </h5>
            </div>
            <div>
              <div className='border-b border-[#ebedf2] dark:border-[#1b2e4b]'>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex-none'>
                    <div className='relative h-6 w-full'>
                      <Image
                        src='/assets/images/card-americanexpress.svg'
                        alt='American Express'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </div>
                  <div className='flex flex-auto items-center justify-between ltr:ml-4 rtl:mr-4'>
                    <h6 className='dark:text-white-dark font-semibold text-[#515365]'>
                      American Express
                    </h6>
                    <span className='text-white-dark dark:text-white-light block'>
                      Expires on 12/2025
                    </span>
                    <span className='badge bg-success ltr:ml-auto rtl:mr-auto'>
                      Primary
                    </span>
                  </div>
                </div>
              </div>
              <div className='border-b border-[#ebedf2] dark:border-[#1b2e4b]'>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex-none'>
                    <div className='relative h-6 w-full'>
                      <Image
                        src='/assets/images/card-mastercard.svg'
                        alt='Mastercard'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </div>
                  <div className='flex flex-auto items-center justify-between ltr:ml-4 rtl:mr-4'>
                    <h6 className='dark:text-white-dark font-semibold text-[#515365]'>
                      Mastercard
                    </h6>
                    <span className='text-white-dark dark:text-white-light block'>
                      Expires on 03/2025
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex-none'>
                    <div className='relative h-6 w-full'>
                      <Image
                        src='/assets/images/card-visa.svg'
                        alt='Visa'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </div>
                  <div className='flex flex-auto items-center justify-between ltr:ml-4 rtl:mr-4'>
                    <h6 className='dark:text-white-dark font-semibold text-[#515365]'>
                      Visa
                    </h6>
                    <span className='text-white-dark dark:text-white-light block'>
                      Expires on 10/2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
