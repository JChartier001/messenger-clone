import { ColumnDef } from "@tanstack/react-table";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  count: number;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "count",
    header: "Product count",
  },
];
