'use client';

import { ColumnDef } from '@tanstack/react-table';

import CellAction from './CellAction';

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  count: number;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'count',
    header: 'Product count',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
