'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';

import { columns, SizeColumn } from './columns';

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Unit Labels (${data.length})`}
          description='Manage unit labels for your products'
        />
        <Button onClick={() => router.push(`/farm/${params.farmId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
    </>
  );
};

export default SizesClient;
