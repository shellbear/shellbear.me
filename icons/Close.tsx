import * as React from 'react';
import { SVGProps } from 'react';

interface CloseProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Close: React.FC<CloseProps> = ({ size = '1em', fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    fill="currentColor"
    role="img"
    width={size}
    height={size}
    {...props}
  >
    <path d="M7.22876 5.81455C6.83824 5.42403 6.20507 5.42403 5.81455 5.81455C5.42402 6.20507 5.42402 6.83824 5.81455 7.22876L9.58578 11L5.81455 14.7712C5.42402 15.1618 5.42402 15.7949 5.81455 16.1854C6.20507 16.576 6.83824 16.576 7.22876 16.1854L11 12.4142L14.7712 16.1854C15.1618 16.576 15.7949 16.576 16.1854 16.1854C16.576 15.7949 16.576 15.1618 16.1854 14.7712L12.4142 11L16.1854 7.22876C16.576 6.83824 16.576 6.20507 16.1854 5.81455C15.7949 5.42403 15.1618 5.42403 14.7712 5.81455L11 9.58579L7.22876 5.81455Z" />
  </svg>
);

export default React.memo<CloseProps>(Close);
