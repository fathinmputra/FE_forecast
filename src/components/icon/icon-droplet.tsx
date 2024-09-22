import { FC } from 'react';

interface IconDropletProps {
  className?: string;
}

const IconDroplet: FC<IconDropletProps> = ({ className }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        opacity='0.5'
        d='M3 13.1928C3 18.0569 6.85549 22 11.6115 22H12.3885C17.1445 22 21 18.0569 21 13.1928V12.9281C21 8.31651 18.2715 4.16347 14.0967 2.42077C12.7527 1.85974 11.2473 1.85974 9.90329 2.42077C5.72854 4.16347 3 8.31651 3 12.9281V13.1928Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M7.61475 10.7237C8.2495 8.71826 9.63062 7.08805 11.3858 6.27637'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default IconDroplet;
