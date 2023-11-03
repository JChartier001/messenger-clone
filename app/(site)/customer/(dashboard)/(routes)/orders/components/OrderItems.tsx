import React from 'react';
import { OrderItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const OrderItems = ({ items }: { items: OrderItem[] }) => {
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-3'>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid h-[150px] max-h-[200px] grid-cols-3 px-20 py-5'
          >
            <div className='relative mb-7 h-[100px] w-[100px]'>
              <Image
                src={item.product.images[0].url}
                alt={item.product.name}
                width={100}
                height={100}
                style={{
                  objectFit: 'cover',
                  maxWidth: '100px',
                  maxHeight: '100px',
                  position: 'relative',
                }}
              />
              <span className='absolute -right-10  rounded-full border px-2 py-1 text-xs dark:border-slate-700 '>
                {item.quantity}
              </span>
            </div>
            <div className='col-span-2'>
              <div className='flex flex-col'>
                <Link
                  href={`/products/${item.product.slug}`}
                  className=' max-h-[50px] overflow-hidden text-ellipsis'
                >
                  {item.product.name}
                </Link>

                <Button variant='default' className='mt-3 w-[150px]'>
                  <RefreshCcw className='mr-2' size={15} /> Buy it again
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex  flex-col justify-center'>
        <Button className='mb-5'>Track Package</Button>
        <Button className='mb-5'>Request a refund</Button>
        <Button className='mb-5'>Write a product review</Button>
        <Button className='mb-5'>Write a farm review</Button>
      </div>
    </div>
  );
};

export default OrderItems;
