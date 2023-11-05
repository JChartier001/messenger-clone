import { format } from "date-fns";

import prismadb from "@/app/libs/prismadb";
import { formatter } from "@/app/libs/utils";

import { OrderColumn } from "./components/columns";
import OrderClient from "./components/client";

const OrdersPage = async ({ params }: { params: { farmId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      farmId: params.farmId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
      farm: true,
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(orders, "orders");

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    customer: item.customer.name,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.length,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0),
    ),

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
