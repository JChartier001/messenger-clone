'use client';


import { ColumnDef, ColumnMeta, RowData } from '@tanstack/react-table';

import CellAction from './CellAction';

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: string;
	}
}


export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  label: string;
  dietary: string | string[];
  isFeatured: string;
  isArchived: string;
  meta?: ColumnMeta<ProductColumn, unknown>;
};

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		meta: {
			className:
				'px-3 py-3.5 text-left text-sm font-semibold  ',
		},
	},
	{
		accessorKey: 'isArchived',
		header: 'Archived',
		meta: {
			className:
				'hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell',
		},
	},
	{
		accessorKey: 'isFeatured',
		header: 'Featured',
		meta: {
			className:
				'hidden px-3 py-3.5 text-left text-sm font-semibold  lg:table-cell',
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		meta: {
			className:
				'hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell',
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
		meta: {
			className:
				'hidden px-3 py-3.5 text-left text-sm font-semibold  sm:table-cell',
		},
	},
	{
		accessorKey: 'dietary',
		header: 'Dietary Options',
		meta: {
			className:
				'hidden px-3 py-3.5 text-left text-sm font-semibold  lg:table-cell',
		},
	},
	{
		accessorKey: 'label',
		header: 'Unit Size',
		meta: {
			className:
				'hidden px-3 py-3.5 text-left text-sm font-semibold  lg:table-cell',
		},
	},
	
];
