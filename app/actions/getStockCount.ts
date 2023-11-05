import prismadb from '@/app/libs/prismadb';

export const getStockCount = async (farmId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      farmId,
      isArchived: false,
    },
  });

  return stockCount;
};
