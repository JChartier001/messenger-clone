// 'use client';

// import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/app/libs/utils";

// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from '@/app/components/ui/Table';
// import  Button  from '@/app/components/ui/Button';
// import  Input from '@/app/components/ui/Input';

// interface DataTableProps<TData, TValue> {
// 	columns: ColumnDef<TData, TValue>[];
// 	data: TData[];
// 	searchKey: string;
// }

// export function DataTable<TData, TValue>({
// 	columns,
// 	data,
// 	searchKey,
// }: DataTableProps<TData, TValue>) {
// 	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
// 	const table = useReactTable({
// 		data,
// 		columns,
// 		getCoreRowModel: getCoreRowModel(),
// 		getPaginationRowModel: getPaginationRowModel(),
// 		onColumnFiltersChange: setColumnFilters,
// 		getFilteredRowModel: getFilteredRowModel(),
// 		state: {
// 			columnFilters,
// 		},
// 	});

// 	return (
// 		<div className='w-full'>
// 			<div className='flex items-center py-4'>
// 				<input
// 					placeholder='Search'
// 					value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
// 					onChange={event =>
// 						table.getColumn(searchKey)?.setFilterValue(event.target.value)
// 					}
// 					className='block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 max-w-sm`,'
// 				/>
// 			</div>
// 			<div className='rounded-md border'>
// 				<Table>
// 					<TableHeader>
// 						{table.getHeaderGroups().map(headerGroup => (
// 							<TableRow key={headerGroup.id}>
// 								{headerGroup.headers.map(header => {
// 									return (
// 										<TableHead key={header.id}>
// 											{header.isPlaceholder
// 												? null
// 												: flexRender(
// 														header.column.columnDef.header,
// 														header.getContext()
// 												  )}
// 										</TableHead>
// 									);
// 								})}
// 							</TableRow>
// 						))}
// 					</TableHeader>
// 					<TableBody>
// 						{table.getRowModel().rows?.length ? (
// 							table.getRowModel().rows.map(row => (
// 								<TableRow
// 									key={row.id}
// 									data-state={row.getIsSelected() && 'selected'}
// 								>
// 									{row.getVisibleCells().map(cell => (
// 										<TableCell key={cell.id}>
// 											{flexRender(
// 												cell.column.columnDef.cell,
// 												cell.getContext()
// 											)}
// 										</TableCell>
// 									))}
// 								</TableRow>
// 							))
// 						) : (
// 							<TableRow>
// 								<TableCell
// 									colSpan={columns.length}
// 									className='h-24 text-center'
// 								>
// 									No results.
// 								</TableCell>
// 							</TableRow>
// 						)}
// 					</TableBody>
// 				</Table>
// 			</div>
// 			<div className='flex items-center justify-end space-x-2 py-4'>
// 				<Button
// 					variant='outline'
// 					size='sm'
// 					onClick={() => table.previousPage()}
// 					disabled={!table.getCanPreviousPage()}
// 				>
// 					Previous
// 				</Button>
// 				<Button
// 					variant='outline'
// 					size='sm'
// 					onClick={() => table.nextPage()}
// 					disabled={!table.getCanNextPage()}
// 				>
// 					Next
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }
import React, { useState } from "react";

interface DataTableProps<TData, TValue> {
  title: string;
  description: string;
  action?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  CellAction?: React.FC<{ data: TData }>;
}

export default function DataTable<TData, TValue>({
  title,
  description,
  action,
  columns,
  data,
  searchKey,
  CellAction,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      columnFilters,
    },
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        {action && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {action}
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full ">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            scope="col"
                            className={cn(
                              "py-3.5 pl-4 pr-3 text-left text-lg font-bold border-b border-gray-600",
                              header.column.columnDef.meta?.className,
                            )}
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        );
                      })}
                      {CellAction && (
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0 border-b border-gray-600"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      )}
                    </tr>
                  );
                })}
              </thead>

              <tbody className="divide-y divide-gray-600">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {" "}
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              scope="col"
                              className={cn(
                                "px-3 py-3.5 text-left text-md text-muted-foreground",
                                cell.column.columnDef.meta?.className,
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          );
                        })}
                        {CellAction && (
                          <td>
                            <CellAction data={row.original} />
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    {" "}
                    <td colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
