import * as React from 'react';
import { SVGProps } from 'react';

interface MenuProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Menu: React.FC<MenuProps> = ({ size = '1em', fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 16"
    width={size}
    height={size}
    role="img"
    style={{
      display: 'block',
    }}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2C0 1.37868 0.50368 0.875 1.125 0.875H16.875C17.4963 0.875 18 1.37868 18 2C18 2.62132 17.4963 3.125 16.875 3.125H1.125C0.50368 3.125 0 2.62132 0 2ZM0 8C0 7.37868 0.50368 6.875 1.125 6.875H16.875C17.4963 6.875 18 7.37868 18 8C18 8.62132 17.4963 9.125 16.875 9.125H1.125C0.50368 9.125 0 8.62132 0 8ZM1.125 12.875C0.50368 12.875 0 13.3787 0 14C0 14.6213 0.50368 15.125 1.125 15.125H16.875C17.4963 15.125 18 14.6213 18 14C18 13.3787 17.4963 12.875 16.875 12.875H1.125Z"
    />
  </svg>
);

export default React.memo<MenuProps>(Menu);
