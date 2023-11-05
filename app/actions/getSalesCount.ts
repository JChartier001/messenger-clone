import prismadb from '@/app/libs/prismadb';

export const getSalesCount = async (farmId: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      farmId,
      isPaid: true,
    },
  });

  return salesCount;
};
