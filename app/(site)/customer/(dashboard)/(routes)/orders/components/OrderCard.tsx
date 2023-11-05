import React from "react";
import Header from "./Header";
import OrderItems from "./OrderItems";
import { Order } from "@/types";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="my-4 w-[90%]">
      <Header order={order!} />
      <OrderItems items={order!.orderItems} />
    </div>
  );
};
export default OrderCard;
