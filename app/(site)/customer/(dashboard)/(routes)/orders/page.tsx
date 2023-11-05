"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import OrderCard from "./components/OrderCard";
import { Order } from "@/app/types";
import { User } from "@prisma/client";
import MustBeSignedInModal from "@/app/components/modals/MustBeSignedInModal";

interface OrdersPageProps {
  user: User | null;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!user?.id || !user?.email) {
    setIsOpen(true);
  }

  useEffect(() => {
    axios
      .get(`/api/orders?customerId=${user?.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [user, toast]);

  return (
    <div className="flex  flex-col items-center justify-center">
      <MustBeSignedInModal
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        action="to view orders"
      />
      {orders &&
        orders.map((order) => <OrderCard order={order} key={order.id} />)}
    </div>
  );
};

export default OrdersPage;
