"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/app/components/ui/Button";
import DataTable from "@/app/components/ui/DataTable";
import Heading from "@/app/components/ui/Heading";
import Separator from "@/app/components/ui/Separator";

import { columns, SizeColumn } from "./columns";
import CellAction from "./CellAction";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Unit Labels (${data.length})`}
          description="Manage unit labels for your products"
        />
        <Button
          onClick={() => router.push(`/farm/${params?.farmId}/sizes/new`)}
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

export default SizesClient;
