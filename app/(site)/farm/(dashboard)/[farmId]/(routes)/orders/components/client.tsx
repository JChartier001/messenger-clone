"use client";

import DataTable from "@/app/components/ui/DataTable";
import Heading from "@/app/components/ui/Heading";
import Separator from "@/app/components/ui/Separator";

import { columns, OrderColumn } from "./columns";
import CellAction from "./CellAction";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your farm"
      />
      <Separator />
      <DataTable
        searchKey="products"
        columns={columns}
        data={data}
        title=""
        description=""
        CellAction={CellAction}
      />
    </>
  );
};
export default OrderClient;
