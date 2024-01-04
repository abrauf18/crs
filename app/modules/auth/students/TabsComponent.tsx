// "use client"

// // TabComponent.tsx
// import React from 'react';

// interface TabComponentProps {
//   label: string;
//   onClick: () => void;
//   active: boolean;
// }

// export function TabComponent({ label, onClick, active }: TabComponentProps) {
//     const handleClick = () => {
//         // onClick(); // Call the provided onClick function
//       };
//   return (
//     <div
//       className={`cursor-pointer px-4 py-2 ${
//         active ? 'bg-yellow-500' : 'bg-transparent'
//       }`}
//     //   onClick={handleClick}
//     >
//       <label
//         htmlFor="terms"
//         className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//       >
//         {label}
//       </label>
//     </div>
//   );
// }
