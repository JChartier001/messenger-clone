'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FarmOrder } from '@/types';
import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { useToast } from '@/components/ui/use-toast';

const Summary = () => {
  const searchParams = useSearchParams();
  const order = useCart((state) => state.order);
  const removeAll = useCart((state) => state.removeAll);
  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast({ description: 'Payment completed.' });
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast({ description: 'Something went wrong.' });
    }
  }, [searchParams, removeAll]);

  const extractProductDetails = (orders: FarmOrder[]) => {
    return orders.map((farmOrder) => {
      return {
        farmId: farmOrder.farmId,
        customerId: user?.id,
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
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Order total</div>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={order.length === 0}
        className='mt-6 w-full'
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
