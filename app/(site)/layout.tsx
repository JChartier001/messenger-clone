import React from "react";
import Navbar from "@/app/components/Navbar";
import getCurrentUser from "../actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
import { Farm } from "@prisma/client";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  const categories = await prismadb.category.findMany();
  const dietary = await prismadb.dietary.findMany();

  let userFarms: Farm[] | [] = [];
  if (currentUser?.id) {
    userFarms = await prismadb.farm.findMany({
      where: {
        userId: currentUser.id,
      },
    });
  }

  return (
    <div>
      <Navbar
        farms={userFarms}
        user={currentUser}
        categories={categories}
        dietary={dietary}
      />
      {children}
    </div>
  );
};

export default AppLayout;
