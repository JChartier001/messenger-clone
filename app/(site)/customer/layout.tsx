import React from 'react';
import CustomerNav from '@/components/FarmerNav';

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full w-full items-center justify-center'>{children}</div>
  );
};

export default CustomerLayout;
