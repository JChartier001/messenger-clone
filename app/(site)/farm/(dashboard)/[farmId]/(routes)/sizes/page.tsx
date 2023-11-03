import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { SizeColumn } from './components/columns';
import SizesClient from './components/client';

const SizesPage = async ({ params }: { params: { farmId: string } }) => {
  const sizes = await prismadb.unitLabel.findMany({
    where: {
      farmId: params.farmId,
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    count: item._count.products,
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
