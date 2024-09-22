import { FC } from 'react';

interface IconChartSquareProps {
  className?: string;
}

const IconChartSquare: FC<IconChartSquareProps> = ({ className }) => {
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
        d='M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M7 18L7 15'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M17 18V9'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M12 18V12'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default IconChartSquare;
