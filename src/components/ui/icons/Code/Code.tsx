import React from 'react';

interface CodeProps {
  stroke?: string; 
  className?:string;
  size?:string;
}

const Code: React.FC<CodeProps> = ({ stroke,className,size }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || "40"} height={size || "40"} viewBox="0 0 40 40" fill="none">
      <path 
        d="M6.66675 28.3333L16.6667 18.3333L6.66675 8.33325"
        stroke={stroke || "#52525B"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M20 31.6667H33.3333"
        stroke={stroke || "#52525B"} 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Code;
