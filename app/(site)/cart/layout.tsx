import React from 'react';
import StoreNavbar from '@/components/StoreNavbar';
import prismadb from '@/lib/prismadb';

interface LayoutProps {
  children: React.ReactNode;
}

const CartLayout: React.FC<LayoutProps> = async ({ children }) => {
  const categories = await prismadb.category.findMany({});

  return (
    <div>
      <header>
        <StoreNavbar categories={categories} />
      </header>
      <main>{children}</main>
      <footer>{/* footer content */}</footer>
    </div>
  );
};

export default CartLayout;
