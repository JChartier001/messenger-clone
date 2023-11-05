"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./CellAction";

export type CertificationColumn = {
  id: string;
  name: string;
  approved: string;
  createdAt: string;
};

export const columns: ColumnDef<CertificationColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "approved",
    header: "Approved",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
