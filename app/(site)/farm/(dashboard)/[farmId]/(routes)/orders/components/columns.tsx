"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  totalPrice: string;
  products: number;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    meta: {
      className: "px-3 py-3.5 text-left text-sm font-semibold  ",
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    meta: {
      className:
        "hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell",
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    meta: {
      className:
        "hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell",
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    meta: {
      className: "px-3 py-3.5 text-left text-sm font-semibold  ",
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
    meta: {
      className: "px-3 py-3.5 text-left text-sm font-semibold  ",
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Placed",
    meta: {
      className:
        "hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell",
    },
  },
];
