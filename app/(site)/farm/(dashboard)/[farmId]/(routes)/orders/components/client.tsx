'use client';

import { DataTable } from '@/components/ui/DataTable';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';

import { columns, OrderColumn } from './columns';

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your farm'
      />
      <Separator />
      <DataTable searchKey='products' columns={columns} data={data} />
    </>
  );
};
export default OrderClient;
