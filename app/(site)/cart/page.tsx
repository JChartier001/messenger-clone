'use client';

import { useEffect, useState } from 'react';
import { MoveLeft } from 'lucide-react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary';
import CartItem from './components/CartItem';
import { useRouter } from 'next/navigation';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <div
            className='mb-3 flex cursor-pointer items-center'
            onClick={() => router.back()}
          >
            <MoveLeft className='mr-2 w-4' />
            <small> Go Back to store</small>
          </div>
          <h1 className='text-3xl font-bold'>Shopping Cart</h1>
          <div className='mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start'>
            <div className='lg:col-span-7'>
              {cart.order.length === 0 && (
                <p className='text-neutral-500'>No items added to cart.</p>
              )}
              <ul>
                {cart.order.map((farm) =>
                  farm.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))
                )}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
