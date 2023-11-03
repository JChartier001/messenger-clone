'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import OrderCard from './components/OrderCard';
import { Order } from '@/types';

const OrdersPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { toast } = useToast();
console.log(user, )
  useEffect(() => {
    axios
      .get(`/api/orders?customerId=${user?.id}`)
      .then((res) => {
        console.log(res, "res")
        setOrders(res.data);
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: err.message,
          variant: 'destructive',
          duration: 4000,
        });
      });
  }, [user]);

  return (
    <div className='flex  flex-col items-center justify-center'>
      {orders &&
        orders.map((order) => <OrderCard order={order} key={order.id} />)}
    </div>
  );
};

export default OrdersPage;
