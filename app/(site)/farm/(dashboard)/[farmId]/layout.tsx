import { redirect } from 'next/navigation';
import getCurrentUser from '@/app/actions/getCurrentUser';


import prismadb from '@/app/libs/prismadb';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { farmId: string };
}) {
 const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    redirect('/sign-in');
  }

  const farm = await prismadb.farm.findFirst({
    where: {
      id: params.farmId,
      userId: currentUser.id,
    },
  });

  if (!farm) {
    redirect('/farm/new/settings');
  }

  return <>{children}</>;
}
