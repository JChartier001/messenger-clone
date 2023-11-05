"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/app/components/ui/Button";
import DataTable from "@/app/components/ui/DataTable";
import Heading from "@/app/components/ui/Heading";
import Separator from "@/app/components/ui/Separator";

import { ProductColumn, columns } from "./columns";
import CellAction from "./CellAction";
// import DataCard from '@/app/components/ui/DataCard';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const mappedProducts = data.map((item) => ({
    name: item.name,
    isArchived: item.isArchived ? "Yes" : "No",
    isFeatured: item.isFeatured ? "Yes" : "No",
    price: item.price,
    category: item.category,
    dietary: item.dietary,
    label: item.label,
    id: item.id,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your farm"
        />
        <Button
          onClick={() => router.push(`/farm/${params?.farmId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
        title=""
        description=""
        CellAction={CellAction}
      />
    </>
  );
};
