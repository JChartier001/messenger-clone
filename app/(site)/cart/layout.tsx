import React from "react";
import CartPage from "./page";
import getCurrentUser from "@/app/actions/getCurrentUser";

import prismadb from "@/app/libs/prismadb";

interface LayoutProps {
  children: React.ReactNode;
}

const CartLayout: React.FC<LayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <main>
        <CartPage user={currentUser} />
      </main>
    </div>
  );
};

export default CartLayout;
