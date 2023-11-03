'use client';

import { ColumnDef } from '@tanstack/react-table';

import CellAction from './CellAction';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  label: string;
  dietary: string | string[];
  isFeatured: string;
  isArchived: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'dietary',
    header: 'Dietary Options',
  },
  {
    accessorKey: 'label',
    header: 'Unit Size',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
