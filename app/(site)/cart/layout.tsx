import React from 'react';

import prismadb from '@/app/libs/prismadb';

interface LayoutProps {
  children: React.ReactNode;
}

const CartLayout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default CartLayout;
