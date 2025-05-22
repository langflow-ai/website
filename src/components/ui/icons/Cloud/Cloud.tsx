import React from 'react';

interface CloudProps {
  stroke?: string; 
  className?: string;
  size?: string;
}

const Cloud: React.FC<CloudProps> = ({ stroke , className, size}) => {
  return (
    <svg className={className} width={size || "40"} height={size || "40"} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M29.1668 31.6666H15.0001C12.8365 31.666 10.7158 31.0639 8.87473 29.9274C7.03371 28.7909 5.54497 27.1648 4.57489 25.2309C3.60481 23.2971 3.19159 21.1315 3.38142 18.9763C3.57126 16.8211 4.35665 14.7611 5.64985 13.0266C6.94305 11.292 8.6931 9.95124 10.7044 9.15406C12.7158 8.35689 14.9092 8.13471 17.0395 8.51236C19.1699 8.89001 21.1532 9.85261 22.768 11.2926C24.3827 12.7326 25.5653 14.5932 26.1834 16.6666H29.1668C31.1559 16.6666 33.0635 17.4568 34.4701 18.8633C35.8766 20.2698 36.6668 22.1775 36.6668 24.1666C36.6668 26.1557 35.8766 28.0634 34.4701 29.4699C33.0635 30.8764 31.1559 31.6666 29.1668 31.6666Z"
        stroke={stroke || "#52525B"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Cloud;
