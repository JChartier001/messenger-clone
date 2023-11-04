import React from 'react';
import Navbar from '@/app/components/Navbar';
import getCurrentUser from '../actions/getCurrentUser';
import prismadb from '@/app/libs/prismadb';

const AppLayout = async({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  const categories = await prismadb.category.findMany();
  const dietary  = await prismadb.dietary.findMany();


  return (
    <div>
      <Navbar user={currentUser} categories={categories} dietary={dietary} />
      {children}</div>
  )
}

export default AppLayout