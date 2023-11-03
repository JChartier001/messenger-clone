'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';

import { ProductColumn, columns } from './columns';
import DataCard from '@/components/ui/DataCard';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const mappedProducts = data.map((item) => ({
    name: item.name,
    isArchived: item.isArchived ? 'Yes' : 'No',
    isFeatured: item.isFeatured ? 'Yes' : 'No',
    price: item.price,
    category: item.category,
    dietary: item.dietary,
    label: item.label,
    id: item.id,
  }));

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your farm'
        />
        <Button
          onClick={() => router.push(`/farm/${params.farmId}/products/new`)}
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
      <div className='flex md:hidden'>
        <DataCard columns={columns} data={mappedProducts} />
      </div>
      <div className='hidden w-full md:flex'>
        <DataTable searchKey='name' columns={columns} data={data} />
      </div>
    </>
  );
};
