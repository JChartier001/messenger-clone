"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { FarmOrder } from "@/app/types";
import Button from "@/app/components/ui/Button";

import useCart from "@/app/hooks/useCart";
import { toast } from "react-hot-toast";
import Currency from "@/app/components/Currency";
import { User } from "@prisma/client";

interface SummaryProps {
  user: User;
}

const Summary: React.FC<SummaryProps> = ({ user }) => {
  const searchParams = useSearchParams();
  const order = useCart((state) => state.order);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams?.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams?.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll, toast]);

  const extractProductDetails = (orders: FarmOrder[]) => {
    return orders.map((farmOrder) => {
      return {
        farmId: farmOrder.farmId,
        customerId: user.id,
        items: farmOrder.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.images[0].url,
        })),
      };
    });
  };

  function getTotalPrice(orders: FarmOrder[]) {
    return orders.reduce((total, farmOrder) => {
      return (
        total +
        farmOrder.items.reduce((itemTotal, item) => {
          return itemTotal + item.subtotal!;
        }, 0)
      );
    }, 0);
  }

  const totalPrice = getTotalPrice(order);

  const onCheckout = async () => {
    const body = {
      productIds: extractProductDetails(order),
      customerId: user?.id,
    };
    const response = await axios.post(`/api/checkout`, body);
    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={order.length === 0}
        className="mt-6 w-full"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
