'use client';

import { ShoppingCart } from 'lucide-react';
import FarmLogo from '@/app/components/FarmLogo';
import Rating from '@/app/components/Rating';
import FavShareGroup from '@/app/components/FavShareGroup';

import Currency from '@/app/components/Currency';
import  Button from '@/app/components/ui/Button';
import { Item, FarmLogoType } from '@/app/types';
import { MouseEventHandler } from 'react';
import useCart from '@/app/hooks/useCart';
import Separator from '@/app/components/ui/Separator';
import Description from './Description';

interface InfoProps {
  data: Item;
  farm: FarmLogoType | null;
}

const Info: React.FC<InfoProps> = ({ data, farm }) => {
  const cart = useCart();
  const tempRate = Math.floor(Math.random() * 5) + 1;
  const tempCount = Math.floor(Math.random() * 1000);
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();

    cart.addItem({ ...data, quantity: 1, subtotal: data.price });
  };
  return (
    <div>
      <div className='flex w-[90%] items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          {data.name}
        </h1>
        <p className='text-2xl'>
          <Currency value={data?.price} />
        </p>
      </div>
      <div className='mt-3 flex w-[90%] items-end justify-between'>
        <Rating
          rate={tempRate}
          count={tempCount}
          color={'#FFDF00'}
          size={20}
          className='flex items-center gap-x-1'
        />

        <FavShareGroup
          shareLink={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/product/${data.slug}`}
          id={data.id}
          itemTitle={data.name}
          type='product'
        />
      </div>
      <Separator className='my-4' />
      <Description data={data} />
      <hr className='my-4' />

      <div className='mt-10 flex w-[95%] items-center justify-between gap-x-3'>
        <FarmLogo farm={farm} />
        <Button onClick={onAddToCart} className='flex items-center gap-x-2'>
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
